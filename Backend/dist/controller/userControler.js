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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const notification_1 = require("../utils/notification");
dotenv_1.default.config();
const jwtsecret = process.env.JWT_SECRET;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        const hashedPassword = yield argon2_1.default.hash(password, { hashLength: 10 });
        //generate otp
        const { otp, expiry } = (0, notification_1.generateOtp)();
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "email already exist" });
        }
        if (!(yield argon2_1.default.verify(hashedPassword, confirmPassword))) {
            return res.status(400).json({ message: "password and confirmPassword does not match" });
        }
        const newUser = new userModel_1.default({
            email,
            password: hashedPassword,
            otp,
            expiry_otp: expiry,
        });
        yield newUser.save();
        return res.status(201).json({ message: "You are Sucessfully registered", newUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const registeredUser = yield userModel_1.default.findOne({ email });
        if (!registeredUser) {
            res.status(400).json({ message: 'Kindly register' });
        }
        if (!(yield argon2_1.default.verify((registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.password) || "", password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.id }, jwtsecret, { expiresIn: "30d" });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({ msg: "Welcome", registeredUser, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
