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
exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const argon2_1 = __importDefault(require("argon2"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        const hashedPassword = yield argon2_1.default.hash(password, { hashLength: 10 });
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "email already exist" });
        }
        if (yield argon2_1.default.verify(hashedPassword, confirmPassword)) {
            return res.status(400).json({ message: "password and confirmPassword does not match" });
        }
        const newUser = new userModel_1.default({
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        return res.status(201).json({ message: "You are Sucessfully registered" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
