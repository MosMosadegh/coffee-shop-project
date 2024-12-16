import connectToDb from "@/configs/db";
import DiscountModel from "@/models/Discount";

export async function DELETE(req) {
    try {
      await connectToDb();
      const body = await req.json();
      const { id } = body;
      //Validation
      
      await DiscountModel.findOneAndDelete({ _id: id })
      return Response.json(
        { message: "Discount Removed successfully :))" },
        { status: 200 }
      );
    } catch (err) {
      return Response.json({ message: err }, { status: 500 });
    }
  }
    