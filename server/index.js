import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRouts from "./routes/auth.js"
import postRoutes from "./routes/post.js"
import commentRoutes from "./routes/comment.js"
import cookieParser from "cookie-parser";


const app = express()
dotenv.config()

app.use(express.json({extended:true}));
app.use(cookieParser());

app.use('/api/auth',authRouts)
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)


 function start(){
    try{
         mongoose.connect(process.env.MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        app.listen(4000,()=> console.log("server been started"))
    } catch(e){
        console.log("server error",e.message);
        process.exit(1)
    }
    
}
start()







app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

app.get('/',(req,res)=>{
    res.send({data:'Hello Wooooooooooooooooooooooooooooooorld'})
})