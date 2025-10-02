import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import tsakRoute from './routes/taskRoute.js'

const app=express();
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());
const port=process.env.PORT||5000;
app.use(authRoutes);
app.use(tsakRoute);


app.listen(5000,()=>{
    console.log(`server is listening on port ${port}`);
})