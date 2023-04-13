"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodobyId = exports.getTodosCreatedByUser = exports.deleteTodo = exports.updateTodo = exports.getAllTodo = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        const createdBy = req.user.id;
        const todo = new todoModel_1.default({
            title,
            description,
            status,
            createdBy,
        });
        yield todo.save();
        res.status(201).send({ message: "Todo created successfully", todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.createTodo = createTodo;
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Todos = yield todoModel_1.default.find();
        res.status(200).json({ Todos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllTodo = getAllTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Todo not found" });
        }
        const { title, description, status } = req.body;
        const todo = yield todoModel_1.default.findByIdAndUpdate(id, {
            title,
            description,
            status,
        });
        res.status(200).json({ message: "Todos updated successfully", todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todoModel_1.default.findByIdAndDelete(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTodo = deleteTodo;
const getTodosCreatedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todos = yield todoModel_1.default.find({ createdBy: id });
        res.status(200).json({ message: "Todos retrieved successfully", todos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTodosCreatedByUser = getTodosCreatedByUser;
const getTodobyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "Todo not found" });
        }
        const todo = yield todoModel_1.default.findById(id);
        res.status(200).json({ message: "Todos retrieved successfully", todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTodobyId = getTodobyId;
