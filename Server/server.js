const express=require('express');
const app=express();
const connectDB=require('./config/connection');
const authRouter=require('./routes/authRouter');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const dotenv= require('dotenv');
dotenv.config();

// connect to database
connectDB();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));

app.use(express.json()); // whenever we get req with json data in body parse it and give it to req.body
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);

// simple route
app.get('/',(req,res)=>{
    res.send("server is running!");
})


// start server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});