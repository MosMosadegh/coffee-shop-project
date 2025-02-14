import connectToDb from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/isLogin";

export async function GET() {
    try {
        await connectToDb();
        
        const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
  
      const wishlist = await WishlistModel.find({ user: user._id }, "-__v")
        .populate("product user")
        .lean();
      return Response.json(
        wishlist,
        { status: 200 }
      );
    } catch (error) {
      return Response.json({ message: error }, { status: 500 });
    }
  }
  