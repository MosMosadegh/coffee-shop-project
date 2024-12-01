import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/isLogin";

// import Joi from "joi";

//schema for validation
// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   phone: Joi.string()
//     .pattern(/^[0-9]+$/)
//     .min(10)
//     .max(15)
//     .required(),
//     email: Joi.string().email().required(),
// });

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const body = await req.json();

    //Joi for validation
    // const { error } = userSchema.validate(regBody);
    // if (error) {
    //   return Response.json(
    //     { message: error.details[0].message },
    //     { status: 400 }
    //   );
    // }

    const { name, email, phone } = body;

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
