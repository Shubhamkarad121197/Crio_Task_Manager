require('dotenv').config();
const express=require('express');
const cors=require('cors');
const taskManagerRoute=require('./src/routes/taskRoutes')

const connectDB=require('./src/config/db')


const app=express();
const PORT=process.env.PORT||8082;

app.use(express.json())

app.use('/api',taskManagerRoute)
connectDB();
app.listen(PORT,()=>{
    console.log("Server is Running PORT:",PORT)
})