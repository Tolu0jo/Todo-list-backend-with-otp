import { Request, Response } from "express";
import User from "../model/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    const newUser=new User({
        email,password
    })
    await newUser.save()
    
    return res.status(201).json({message:"You are Sucessfully registered"})

  } catch (error) {
    console.log(error);
  }
}