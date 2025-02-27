
import connectToDb from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET() {
    try {
        await connectToDb();
        const session = await getServerSession(authOptions); 
        const user = session.user
    if (!user) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
  
      const wishlist = await WishlistModel.find({ user: user.id }, "-__v")
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
  