import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";
import { authAdmin } from "@/utils/isLogin";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }

    await connectToDb();
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags");
    const img = formData.get("img");

    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/" + fileName);

    await writeFile(imgPath, buffer);

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      img: `http://localhost:3000/uploads/${fileName}`,
    });

    return Response.json(
      { message: "Product Create successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
