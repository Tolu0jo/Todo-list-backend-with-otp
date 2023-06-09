import express, { Request, Response } from "express";
import Todo from "../model/todoModel";

export const createTodo = async (req: Request | any, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user.id;
    console.log(req.user)

    const todo = new Todo({
      title,
      description,
      completed,
      userId,
    });

    await todo.save();

    res.status(201).send({ message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const Todos = await Todo.find();
    res.status(200).json({ Todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ message: "Todo not found" });
    }
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      completed,
    });
    res.status(200).json({ message: "Todos updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodosCreatedByUser = async (req: Request|any, res: Response) => {
  try {
    const { userId } = req.user.id

    const todos = await Todo.find({ userId});

    res.status(200).json({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodobyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ msg: "Todo not found" });
    }
    const todo = await Todo.findById(id);

    res.status(200).json({ message: "Todos retrieved successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
