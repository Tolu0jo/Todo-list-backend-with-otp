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
exports.emailHtml = exports.sendMail = exports.onRequestOTP = exports.generateOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.generateOtp = generateOtp;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const client = require("twilio")(config_1.accountSid, config_1.authToken);
    const response = yield client.messages.create({
        body: `Your verification code is ${otp}`,
        to: toPhoneNumber,
        from: config_1.fromAdminPhone,
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
let transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.GMAIL_USER,
        pass: config_1.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, //the TLS layer is instructed not to reject the connection if the server's certificate is invalid or self-signed
    },
});
const sendMail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield transport.sendMail({
            from: config_1.FromAdminMail,
            to,
            subject: config_1.userSubject,
            html,
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
const emailHtml = (otp) => {
    const temp = `
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Fibonacci</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Fibonacci. Use the following OTP to complete your Sign Up procedures. OTP is valid for 30 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Fibonacci</p>
    <hr style="border:none;border-top:1px solid #eee" />
   
  </div>
</div>
`;
    return temp;
};
exports.emailHtml = emailHtml;
