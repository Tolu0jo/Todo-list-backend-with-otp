import { Request, Response } from "express";
import User from "../model/userModel";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { emailHtml, generateOtp, onRequestOTP, sendMail } from "../utils/notification";
import { FromAdminMail, userSubject } from "../config";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, phone } = req.body;
 
    const hashedPassword =await argon2.hash(password,{hashLength: 10})
   
      //generate otp

      const {otp,expiry}=generateOtp();
     
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (!await argon2.verify(hashedPassword,confirmPassword)){
        return res.status(400).json({message: "password and confirmPassword does not match"})
    }
    const newUser=new User({
        email,
        password:hashedPassword,
        otp,
        expiry_otp:expiry, 
        phone 
    })
   //send otp to user 
    await onRequestOTP(otp,phone) 

    //send mail to user
    const html =  emailHtml(otp)
     
   await sendMail(FromAdminMail,email,userSubject,html)

    await newUser.save()
    
    
    return res.status(201).json({message:"You are Sucessfully registered",newUser})

  } catch (error) {
    console.log(error);
  }
}

export const login =async(req: Request, res: Response)=>{
 try {
    const {email,password} = req.body
    const registeredUser= await User.findOne({email})
    if(!registeredUser){
     res.status(400).json({message:'Kindly register'})
    }
    if (!await argon2.verify(registeredUser?.password || "", password)) {
     return res.status(400).json({message: 'Invalid credentials'});
   }
 const token = jwt.sign({id:registeredUser?.id}, jwtsecret, { expiresIn: "30d" });
 res.cookie("token", token, {
     httpOnly: true,
     maxAge: 30 * 24 * 60 * 60 * 1000,
   });
   return res
        .status(200)
          .json({ msg: "Welcome", registeredUser, token })
 } catch (error) {
    console.log(error);
 }
}

