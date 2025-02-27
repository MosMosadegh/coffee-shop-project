import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";
import { authAdmin } from "@/utils/isLogin";
import { writeFile } from "fs/promises";
import multer from "multer";
import path from "path";

// Config multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


//Start Main Function
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

    if (!name || !price || !img) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now()+"_" + img.name.replace(/\s/g,"_");
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
      img: `/uploads/${fileName}`,
    });

    return Response.json(
      { message: "Product Create successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
