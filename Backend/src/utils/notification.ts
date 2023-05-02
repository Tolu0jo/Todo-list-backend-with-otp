import nodemailer from "nodemailer";
import {
  accountSid,
  authToken,
  FromAdminMail,
  fromAdminPhone,
  GMAIL_PASS,
  GMAIL_USER,
  userSubject,
} from "../config";



export const generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const client = require("twilio")(accountSid, authToken);
  const response = await client.messages.create({
    body: `Your verification code is ${otp}`,
    to: toPhoneNumber,
    from: fromAdminPhone,
  });
  return response;
};

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, //the TLS layer is instructed not to reject the connection if the server's certificate is invalid or self-signed
  },
});

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await transport.sendMail({
      from: FromAdminMail,
      to,
      subject: userSubject,
      html,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const emailHtml = (otp: number) => {
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
return temp
};
