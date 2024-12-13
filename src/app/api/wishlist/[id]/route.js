import { authUser } from "@/utils/isLogin";
import WishlistModel from "@/models/Wishlist";
import connectToDb from "@/configs/db";

export async function DELETE(req, { params }) {
  try {
     await connectToDb();
    const user = await authUser();
    
    if (!user) {
      return Response.json({ message: "Please login first" }, { status: 401 });
    }

    const productID = params.id;
    console.log("productID=>", productID);
    await WishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });
    return Response.json({ message: "Product removed Successfully" });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
