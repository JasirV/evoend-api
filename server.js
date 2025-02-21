const app =require('./app')
const Connect=require('./config/dbConnect')


Connect()



const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log('server runing on ',PORT);
    
})