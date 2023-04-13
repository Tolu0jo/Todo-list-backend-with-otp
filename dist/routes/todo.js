"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth");
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.post('/create', auth_1.auth, todoController_1.createTodo);
router.get('/', todoController_1.getAllTodo);
router.get("/getTodo/:id", auth_1.auth, todoController_1.getTodobyId);
router.get("/mytodo", auth_1.auth, todoController_1.getTodosCreatedByUser);
router.patch('/updateTodo/:id', auth_1.auth, todoController_1.updateTodo);
router.delete("/deleteTodo/:id", auth_1.auth, todoController_1.deleteTodo);
exports.default = router;
