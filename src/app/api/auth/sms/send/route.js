import connectToDb from "@/configs/db";
import OtpModel from "@/models/Otp";
import axios from "axios"

export async function POST(req) {
  try {
    await connectToDb();
    const regBody = await req.json();

    const { phone } = regBody;

    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const deviceInfo = req.headers["user-agent"];

    let otpEntry = await OtpModel.findOne({ phone });

    // const now = new Date()
    // const expTime = now.getTime() + 300_000  //5 min
    const otpCode = Math.floor(Math.random() * 99999);

    if (otpEntry) {
      // اگر ورودی وجود دارد، کد جدید تولید کنید و آن را به‌روزرسانی کنید
      otpEntry.code = otpCode; // به‌روزرسانی کد
      otpEntry.expTime = Date.now() + 1 * 60 * 1000; // زمان انقضا 1 دقیقه
      otpEntry.ipAddress = ipAddress; // به‌روزرسانی IP
      otpEntry.deviceInfo = deviceInfo; // به‌روزرسانی اطلاعات دستگاه
    } else {
      // اگر ورودی وجود ندارد، ورودی جدید ایجاد کنید
      otpEntry = new OtpModel({
        phone,
        code: otpCode, // تولید کد OTP
        expTime: Date.now() + 1 * 60 * 1000, // زمان انقضا 1 دقیقه
        ipAddress,
        deviceInfo,
      });
    }

    const response = await axios.post("http://ippanel.com/api/select", {
      op: "pattern",
      user: "FREE09127595049",
      pass: "Faraz@0492685150",
      fromNum: "3000505",
      toNum: phone,
      patternCode: "tt41zwwlms7p06j",
      inputData: [{ "verification-code": otpCode }], // اصلاح شده به otpCode
    });

    if (response.status === 200) {
      await otpEntry.save(); // ذخیره کد OTP در پایگاه داده
      return new Response(JSON.stringify({ message: "Code sent successfully", code: otpEntry.code }), { status: 201 });
    } else {
      console.error("Error sending OTP:", response.data);
      return new Response(JSON.stringify({ message: "Failed to send OTP" }), { status: 500 });
    }

    
  } catch (error) {
    console.error("Error while creating OTP:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
