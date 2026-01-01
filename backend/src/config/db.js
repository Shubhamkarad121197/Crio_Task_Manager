const  mongoose=require('mongoose');


const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database is Connected');
    }
    catch(err){
        console.error("MongoDB Server Error");
        process.exit(1)
    }
}

module.exports=connectDB;