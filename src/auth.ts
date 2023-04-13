import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "./model/userModel";
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

    const { email } = verified as { [key: string]: string }; //id is a sting instead of doing interface

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "kindly register as a user" });
    }

    req.user = verified;

    next();
  } catch (err) {
    res.status(401).json({ error: "User not logged in" });
  }
}
