import express, { Application } from "express";
import logger from "morgan";
import todoRouter from "./routes/todo";
import userRouter from "./routes/user";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config();

const app: Application = express();




const initializeConfig = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('Connected to MongoDb')
  } catch (error) {
    console.log(error)
  }
}

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors())

app.use("/todo", todoRouter);
app.use("/user", userRouter);

const port: number = 5050;

app.listen(port, async() => {
  await initializeConfig()
  console.log(`listening at port ${port}...`);
});
