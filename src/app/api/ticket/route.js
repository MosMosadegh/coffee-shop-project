import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/isLogin";
import validateTicket from "@/validations/tickets";

export async function POST(req, res) {
  try {
    await connectToDb();
    const user = await authUser();
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
      user: user._id,
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
