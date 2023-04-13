import express, {Response,Request}from "express"
import { login, register } from "../controller/userControler"
const router = express.Router()

router.post("/register", register)
router.post("/login",login)
export default router