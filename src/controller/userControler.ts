import { Request, Response } from "express";
import User from "../model/userModel";
import argon2 from "argon2"

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    const hashedPassword =await argon2.hash(password,{hashLength: 10})

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (await argon2.verify(hashedPassword,confirmPassword)){
        return res.status(400).json({message: "password and confirmPassword does not match"})
    }
    const newUser=new User({
        email,
        password:hashedPassword,
    })
    await newUser.save()
    
    return res.status(201).json({message:"You are Sucessfully registered"})

  } catch (error) {
    console.log(error);
  }
}

