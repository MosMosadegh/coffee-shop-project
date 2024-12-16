import connectToDb from "@/configs/db";
import DiscountModel from "@/models/Discount";

export async function PUT(req) {
  try {
    await connectToDb();

    const body = await req.json();

    const { code } = body;

    // Validation 👈✍

    const discount = await DiscountModel.findOne({ code });

    if (!discount) {
      return Response.json({ message: "Code not found !!" }, { status: 404 });
    } else if (discount.uses === discount.maxUse) {
      return Response.json({ message: "Code expired !!" }, { status: 422 });
    } else {
      await DiscountModel.findOneAndUpdate(
        { code },
        {
          $inc: {
            uses: 1,
          },
        }
      );

      return Response.json(discount);
    }
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
