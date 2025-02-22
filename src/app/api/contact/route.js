import connectToDb from "@/configs/db";
import ContactModel from "@/models/Contact";
import Joi from 'joi';

const contactSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    body: Joi.string().min(1).max(500).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(), 
    company: Joi.string().allow('').optional()
});


export async function POST(req) {
  try {
    await connectToDb();
    const regBody = await req.json();

    const { error } = contactSchema.validate(regBody);
    if (error) {
        //console.log("Validation Error:", error.details);
      return Response.json({ message: error.details[0].message }, { status: 400 });
    }

    const {
        userName,
        body,
        email,
        phone,
        company,
    } = regBody;

    const contact = await ContactModel.create({
        userName,
        body,
        email,
        phone,
        company: company || "null",
    });


    return Response.json(
      { message: "Contact Create successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
 const contact = await ContactModel.find({}, '-__v').lean()
 return Response.json(contact)

}
