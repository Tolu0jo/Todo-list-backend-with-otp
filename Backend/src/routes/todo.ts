import express, {Response,Request}from "express"
import { auth } from "../auth"
import { createTodo, deleteTodo, getAllTodo, getTodobyId, getTodosCreatedByUser, updateTodo } from "../controller/todoController"

const router = express.Router()

router.post('/create',auth,createTodo)
router.get('/',getAllTodo)
router.get("/getTodo/:id",auth,getTodobyId)
router.get("/mytodo",auth,getTodosCreatedByUser)
router.patch('/updateTodo/:id',auth,updateTodo)
router.delete("/deleteTodo/:id",auth,deleteTodo)

export default router