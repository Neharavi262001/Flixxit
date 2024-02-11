const express=require('express')
require('dotenv').config()
const {notFound,errorHandler}=require('./middlewares/errorHandler')
const db =require('./config/db')
const userRoutes=require('./routes/userRoutes')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express()
const PORT= process.env.PORT || 8000
db()

const corsOptions={
    origin: 'https://flixxit-zeta.vercel.app', 
    credentials: true 
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/user',userRoutes)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})