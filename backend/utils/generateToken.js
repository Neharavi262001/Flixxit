const jwt =require('jsonwebtoken')


const generateToken=(userId)=>{

    const token =jwt.sign(
        {userId},
        process.env.SECRET_TOKEN,
        {expiresIn:'10d'}
        )
    
    // res.cookie('jwt',token,{
    //     httpOnly:true,
    //     secure:true,
    //     sameSite:'None',
    //     maxAge:10*24*60*60*1000

    // })
    return token;
    
}

module.exports=generateToken