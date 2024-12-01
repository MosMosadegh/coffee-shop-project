import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDb();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      { message: "Product Create successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
 const products = await ProductModel.find({}, '-__v').populate("comments").lean()
 return Response.json(products)

}
