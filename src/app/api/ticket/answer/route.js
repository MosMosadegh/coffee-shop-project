import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authAdmin, authUser } from "@/utils/isLogin";
// import validateTicket from "@/validations/tickets";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }
    
    await connectToDb();

    const regBody = await req.json();

    // // validation Zod
    // const result = validateTicket(regBody);
    // if (!result.success) {
    //   return res.status(400).send(result.error.errors[0].message);
    // }

    const { title, body, department, subDepartment, priority, ticketID } =
      regBody;
    const user = await authUser();

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      mainTicket: ticketID,
    });

    return Response.json(
      { message: "Answer saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
