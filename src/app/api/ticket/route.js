import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";
import validateTicket from "@/validations/tickets";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req, res) {
  try {
    await connectToDb();
    const session = await getServerSession(authOptions);
    const user = session.user;
    const regBody = await req.json();

    // validation Zod
    const result = validateTicket(regBody);
    if (!result.success) {
      return res.status(400).send(result.error.errors[0].message);
    }

    const { title, body, department, subDepartment, priority } = regBody;

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user.id,
    });

    return Response.json(
      { message: "Ticket saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  await connectToDb();
  const ticket = await TicketModel.find({}, "-__v").lean();
  return Response.json(ticket);
}
