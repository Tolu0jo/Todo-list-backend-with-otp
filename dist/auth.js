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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("./model/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtsecret = process.env.JWT_SECRET;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.status(401).json({ error: "Kindly sign in as a user" });
        }
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res
                .status(401)
                .json({ error: "token invalid,you cant access this route" });
        }
        const { id } = verified;
        const user = yield userModel_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ error: "kindly register as a user" });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
        console.log(err);
    }
});
exports.auth = auth;
