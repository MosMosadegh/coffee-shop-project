import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";
import { authUser } from "@/utils/isLogin";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
// import Joi from 'joi';

//schema for validation
// const commentSchema = Joi.object({
//     userName: Joi.string().min(3).max(30).required(),
//     body: Joi.string().min(1).max(500).required(),
//     email: Joi.string().email().required(),
//     score: Joi.number().integer().min(1).max(5),
//     productID: Joi.string().required(),
//   });

export async function POST(req) {
  try {
    await connectToDb();
    const session = await getServerSession(authOptions);
    const user = session.user;
    const regBody = await req.json();

    // const { error } = commentSchema.validate(regBody);
    // if (error) {
    //   return Response.json({ message: error.details[0].message }, { status: 400 });
    // }

    const { userName, body, email, score, productID } = regBody;

    const comment = await CommentModel.create({
      userName,
      body,
      email,
      score,
      productID,
      user: user.id,
    });

    const updateProduct = await ProductModel.findOneAndUpdate(
      { _id: productID },
      {
        $push: {
          comments: comment._id,
        },
      }
    ).lean();

    return Response.json(
      { message: "Comment Create successfully", data: comment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating comment:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
