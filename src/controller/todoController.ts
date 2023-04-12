import { Request, Response } from "express";
import Todo from "../model/todoModel";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const todo = new Todo({
      title,
      description,
      status,
    });

    await todo.save();

    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
    const { title, description, status } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      status,
    });
    res.status(200).json({ message: "Todos updated successfully", todo});

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

export const getTodosCreatedByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todos = await Todo.find({ createdBy: id });

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
