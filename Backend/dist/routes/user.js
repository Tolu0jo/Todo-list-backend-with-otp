"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controller/userControler");
const router = express_1.default.Router();
router.post("/register", userControler_1.register);
router.post("/login", userControler_1.login);
exports.default = router;
