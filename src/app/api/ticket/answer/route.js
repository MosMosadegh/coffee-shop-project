import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
// import validateTicket from "@/validations/tickets";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const user = session.user;

    if (session.user.role !== "ADMIN") {
      throw new Error("This Api is protected");
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

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user.id,
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
