const request = require("request");
import connectToDb from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const { phone, action } = body;
    // console.log("🚀 ~ POST ~ body:", body)

    // جمع‌آوری اطلاعات IP و Device
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      (req.socket ? req.socket.remoteAddress : null);

    const deviceInfo = req.headers["user-agent"];

    const otpCode = Math.floor(Math.random() * 999999);
    //console.log("Generated OTP Code:", otpCode);

    const isUserExist = await UserModel.findOne({
      $or: [{ phone }],
    });
    //console.log("Is user exist:", isUserExist);


    if (action === 'register'){
      if (isUserExist) {
        return Response.json(
          {
            message: "The username or email or phone exist already !!",
          },
          {
            status: 422,
          }
        );
      }

      const otpEntry = new OtpModel({
        phone,
        code: otpCode,
        expTime: Date.now() + 1 * 60 * 1000,
        ipAddress,
        deviceInfo,
      });

      await otpEntry.save();
      //console.log('New OTP entry saved:', otpEntry);

      
    }else if(action === "login"){
      if (!isUserExist) {
        return Response.json(
          { message: "User not found. Please register first." },
          { status: 404 }
        );
      }

      // بررسی وجود شماره تلفن
      let otpEntry = await OtpModel.findOne({ phone });
  
      if (otpEntry) {
        // اگر ورودی وجود دارد، کد جدید تولید کنید و آن را به‌روزرسانی کنید
        otpEntry.code = otpCode; // به‌روزرسانی کد
        otpEntry.expTime = Date.now() + 1 * 60 * 1000;
        otpEntry.isUsed = false;
        otpEntry.ipAddress = ipAddress; // به‌روزرسانی IP
        otpEntry.deviceInfo = deviceInfo; // به‌روزرسانی اطلاعات دستگاه
      } else {
        // اگر ورودی وجود ندارد، ورودی جدید ایجاد کنید
        otpEntry = new OtpModel({
          phone,
          code: otpCode, // تولید کد OTP
          expTime: Date.now() + 1 * 60 * 1000,
          ipAddress,
          deviceInfo,
        });
      }
      await otpEntry.save();
      console.log('OTP entry saved or updated:', otpEntry);
    } else {
      return Response.json(
        { message: "Invalid action" },
        { status: 400 }
      );
    }
    
        request.post({
          url: 'http://ippanel.com/api/select',
          body: {
    "op":"pattern",
    "user":process.env.SMS_API_USER,
    "pass":process.env.SMS_API_PASS,
    "fromNum": process.env.SMS_API_FROM_NUM,
    "toNum":phone,
    "patternCode":process.env.SMS_API_PATTERN_CODE,
    "inputData":[
    { "verification-code": code }
    ]
    },
            json: true,
          },
           function (error, response, body) {
            if (!error && response.statusCode === 200) {
              //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
   
              //console.log(response.body);
            } else {
              //console.log("whatever you want");
            }
          }
        );

    return Response.json(
      { message: "Code sent successfully :))" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating OTP:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
