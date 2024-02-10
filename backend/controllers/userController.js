const asyncHandler=require('express-async-handler')
const User =require('../models/userModel')
const generateToken=require('../utils/generateToken')
const { stripe } = require('../utils/stripe')
const passwordValidator = require('password-validator');
const bcrypt=require('bcryptjs')

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)                                  
    .is().max(100)                                 
    .has().uppercase()                              
    .has().lowercase()                            
    .has().digits()                                
                                   


const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   const user = await User.findOne({email})
  
   if (user &&(await user.matchPassword(password))){

    if (!user.stripeCustomerId) {
      res.status(401).json({ error: 'User does not have a Stripe customer ID' });
      return;
    }
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
      });
      const hasActiveSubscription = subscriptions.data.some(
        (subscription) => subscription.status === 'active'
      );
    

        if (hasActiveSubscription) {

        const token=  generateToken(user._id)

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          hasActiveSubscription: true,
          token
        });
      } else {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          hasActiveSubscription: false,
      });
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    
}else{
 
  res.status(401)
  throw new Error('Invalid credentials')
}

})

const registerUser=asyncHandler(async(req,res)=>{
  const { name, email, password } = req.body;
    if (!passwordSchema.validate(password)) {
      res.status(400);
      throw new Error('Password must be at least 8 characters long and include uppercase, lowercase and digits.');
  }

    const userExists=await User.findOne({email})
    if (userExists){
        res.status(400)
        throw Error('Email already in use')
    }

    //create stripe customer
    const customer=await stripe.customers.create({
      email,
      address: {
        country: 'IN',
      },
    })
   
    const user= await User.create(
        {
            name,
            email,
            password,
            stripeCustomerId:customer.id
           
        }
    )



    if (user){
       const token = generateToken(user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            stripeCustomerId:customer.id,
            token
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

    
})

const logoutUser=asyncHandler(async(req,res)=>{
  //  res.cookie('jwt','',{
  //   httpOnly:true,
  //   expires:new Date(0)
  //  })
   res.status(200).json({message:"Logged out successfully"})
})

//private
const userProfile=asyncHandler(async(req,res)=>{
    const {_id,name,email,stripeCustomerId}=req.user
    const user ={
        _id:_id,
        name:name,
        email:email,
        
        stripeCustomerId:stripeCustomerId
    }
    res.status(200).json(user)
})

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.newPassword) {

        if (!passwordSchema.validate(req.body.newPassword)) {
          res.status(400);
          throw new Error('Password must be at least 8 characters long and include uppercase, lowercase and digits.');
      }
            const isCurrentPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isCurrentPasswordValid) {
                res.status(401)
                throw new Error('Current password is incorrect');
            } 
          user.password = req.body.newPassword
      }

      const updatedUser = await user.save();

        const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
    });

    const hasActiveSubscription = subscriptions.data.some(
      (subscription) => subscription.status === 'active'
    );

    const token =generateToken(updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      hasActiveSubscription: hasActiveSubscription,
      token,
      message: 'Profile updated successfully',
    });
  } catch (error) {
      console.error('Error updating user profile:', error);

      res.status(500).json({ error: 'Internal Server Error' });
      throw new Error(error)
  }
});







module.exports={registerUser,loginUser,logoutUser,updateUserProfile,userProfile}