import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi';

export const registerController=async(req,res)=>{
    const userSchema=Joi.object({
        username:Joi.string().min(5).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(100).required()
    });
    try {
       const {error}=userSchema.validate(req.body);
       if(error){
        return res.status(400).json({success:false,message:error.details[0].message});
       }
       const {username,email,password}=req.body;
       const user=await User.findOne({email});
       if(user){
        return res.status(400).json({success:false,message:'user already exist!'});
       }
       const salt=await bcrypt.genSalt(10);
       const hashPassword=await bcrypt.hash(password,salt);
       const newUser=new User({username,email,password:hashPassword});
       await newUser.save();
       const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.JWT_SECRET,{expiresIn:'1d'});
       return res.status(200).json({success:true,token,message:"user successfully registered"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something wents wrong"});
    }
}

export const loginController=async(req,res)=>{
    const userSchema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(100).required()
    })
    try {
        const {error}=userSchema.validate(req.body);
        if(error){
            return res.status(400).json({success:false,message:error.details[0].message});
        }
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"user not exist!"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"invalid credentials"});
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).json({success:true,token,message:"logged in successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:'something wents wrong'});
    }
}