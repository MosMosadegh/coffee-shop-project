import connectToDb from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import Joi from "joi";

const wishlistSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), // الگوی ObjectId
  product: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), // الگوی ObjectId
});

export async function POST(req) {
  try {
    connectToDb();
    const body = await req.json();
    const { user, product } = body;

    // اعتبارسنجی با استفاده از Joi
    const { error } = wishlistSchema.validate({ user, product });
    if (error) {
      return Response.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    //if that item don't exist in wishlist added
    const wish = await WishlistModel.findOne({ user, product });
    if (!wish) {
      await WishlistModel.create({ user, product });
    }

    return Response.json(
      { message: "Product added to Wishlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  const wishlist = await WishlistModel.find({}, "-__v")
    .populate("product user")
    .lean();
  return Response.json(wishlist);
}
