import WishlistModel from "@/models/Wishlist";
import connectToDb from "@/configs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  try {
     await connectToDb();
    const session = await getServerSession(authOptions);
    const user = session.user;
    
    if (!user) {
      return Response.json({ message: "Please login first" }, { status: 401 });
    }

    const productID = params.id;
    //console.log("productID=>", productID);
    await WishlistModel.findOneAndDelete({
      user: user.id,
      product: productID,
    });
    return Response.json({ message: "Product removed Successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
