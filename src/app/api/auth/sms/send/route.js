import connectToDb from "@/configs/db";
import OtpModel from "@/models/Otp";
const request = require("request");

export async function POST(req) {
  try {
    await connectToDb();
    const regBody = await req.json();

    const { phone } = regBody;
    const now = new Date()
    const expTime = now.getTime() + 300_000  //5 min
    const code = Math.floor(Math.random() * 99999);

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "FREE09127595049",
          pass: "Faraz@0492685150",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "tt41zwwlms7p06j",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            
          await OtpModel.create({
            phone,
            code,
            expTime,
          });
            
          console.log(response.body);
        } else {
          console.log("whatever you want");
        }
      }
    );

    return Response.json(
      { message: "Code Send successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating OTP:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
