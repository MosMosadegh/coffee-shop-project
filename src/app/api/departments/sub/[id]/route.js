import connectToDb from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid !!" }, { status: 422 });
    }
    const subDepartment = await SubDepartmentModel.find(
      { departmentID: id },
      "-__v"
    );
    return Response.json(subDepartment, { status: 200 });
  } catch {
    return Response.json({ message: error }, { status: 500 });
  }
}
