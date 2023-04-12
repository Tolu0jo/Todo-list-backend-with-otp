import express, { Application } from "express";
import logger from "morgan";
import todoRouter from "./routes/todo";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

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
app.use("/todo", todoRouter);

const port: number = 5050;

app.listen(port, async() => {
  await initializeConfig()
  console.log(`listening at port ${port}...`);
});
