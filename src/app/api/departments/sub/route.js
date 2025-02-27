import connectToDb from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";

// import Joi from "joi";


// //schema for validation
// const SubDepartmentSchema = Joi.object({
//     title: Joi.string().min(3).max(30).required(),
//     departmentID: Joi.string().required(),
//   });
  
  export async function POST(req) {
    try {
      await connectToDb();
  
      const body = await req.json();
  
      // const { error } = SubDepartmentSchema.validate(body);
      // if (error) {
      //   return Response.json(
      //     { message: error.details[0].message },
      //     { status: 400 }
      //   );
      // }
  
      const { title, departmentID } = body;
  
      await SubDepartmentModel.create({
        title,
        departmentID,
      });
  
      return Response.json(
        { message: "SubDepartment Create successfully" },
        { status: 200 }
      );
    } catch (error) {
      return Response.json({ message: error }, { status: 500 });
    }
  }