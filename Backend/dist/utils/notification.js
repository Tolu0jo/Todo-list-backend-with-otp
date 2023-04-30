"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.generateOtp = generateOtp;
