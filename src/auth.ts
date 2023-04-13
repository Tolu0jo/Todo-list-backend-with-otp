import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "./model/userModel";
import dotenv from "dotenv";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET as string;

export const auth =  async (
  req: Request | any,
  res: Response,
  next: NextFunction
) =>{
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
      return res.status(401).json({ error: "Kindly sign in as a user" });
    }

    let verified = jwt.verify(authorization, jwtsecret);
   
    if (!verified) {
      return res
        .status(401)
        .json({ error: "token invalid,you cant access this route" });
    }

    const { id } = verified as { [key: string]: string }; 

    const user = await User.findOne({ _id:id });

    if (!user) {
      return res.status(401).json({ error: "kindly register as a user" });
    }

    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err)
  }
}
