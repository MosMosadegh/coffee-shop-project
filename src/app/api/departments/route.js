import connectToDb from "@/configs/db";
import DepartmentModel from "@/models/Department";
import { authAdmin } from "@/utils/isLogin";

import Joi from "joi";

//schema for validation
const DepartmentSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
});

export async function POST(req) {
  try {

    await connectToDb();

    const body = await req.json();

    const { error } = DepartmentSchema.validate(body);
    if (error) {
      return Response.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const { title } = body;

    await DepartmentModel.create({
      title,
    });

    return Response.json(
      { message: "Department Create successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
    await connectToDb()
    const department = await DepartmentModel.find({}, "-__v").lean();
    return Response.json(department);
  }
  
