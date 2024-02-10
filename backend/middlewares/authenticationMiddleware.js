const jwt =require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User =require('../models/userModel')

const protectedRoutes=asyncHandler(async(req,res,next)=>{
    // const token = req.cookies.jwt;
   
    // if (token){
    //     try {
    //       const decoded=jwt.verify(token,process.env.SECRET_TOKEN) 
        
    //       req.user=await User.findById(decoded.userId).select('-password') 
    //       next()
    //     } catch (error) {
          
    //       res.status(401).json({ error: 'Not authorized, invalid token' });
    //     }

    // }else{
    //     res.status(401)
    //     throw new Error('Not authorized , no token received')
    // }
    const jwt = require('jsonwebtoken');
    const asyncHandler = require('express-async-handler');
    const User = require('../models/userModel');
    
    const protectedRoutes = asyncHandler(async (req, res, next) => {
      let token;
    
      
      const authHeader = req.headers.authorization;
    
      if (authHeader && authHeader.startsWith('Bearer')) {
       
        token = authHeader.split(' ')[1];
      }
    
      if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token received');
      }
    
      try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    
        req.user = await User.findById(decoded.userId).select('-password');
        next();
      } catch (error) {
        res.status(401).json({ error: 'Not authorized, invalid token' });
      }
    });
    
    module.exports = { protectedRoutes };

})

module.exports={protectedRoutes}