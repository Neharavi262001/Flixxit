const mongoose =require('mongoose')

const db=async()=>{
    try {
        const connection =await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to Database : ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit()
    }
    
}


module.exports=db