import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";

export async function GET() {
  try {
    await connectToDb();
    const products = await ProductModel.find({}, "-__v").lean();
    return Response.json(products);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
