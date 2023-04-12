import express, {Response,Request}from "express"
import { createTodo, deleteTodo, getAllTodo, getTodobyId, updateTodo } from "../controller/todoController"

const router = express.Router()

router.post('/create',createTodo)
router.get('/',getAllTodo)
router.get("/getTodo/:id",getTodobyId)
router.patch('/updateTodo/:id',updateTodo)
router.delete("/deleteTodo/:id",deleteTodo)

export default router