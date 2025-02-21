const mongoose =require('mongoose')
const dotenv =require('dotenv')
dotenv.config()
const path =require('path')



const connectDB =async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Connected");
        
    } catch (error) {
        console.log(error)
    }
}


module.exports=connectDB