const mongoose =require('mongoose');

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected with Database😍🎉🎉");
    } catch (error) {
        console.log("error in connection😏😏",error.message);
    }
}

module.exports=connectDB;