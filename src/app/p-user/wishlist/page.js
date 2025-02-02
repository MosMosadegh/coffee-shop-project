import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDb from "@/configs/db";
import { authUser } from "@/utils/isLogin";
import WishlistModel from "@/models/Wishlist";


const page = async () => {
  await connectToDb();
  const user = await authUser();

  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  const formattedWishlist ={
    _id: wish._id.toString(),
    product: {
      _id: wish.product._id.toString(),
      name: wish.product.name,
      price: wish.product.price,
      score: wish.product.score,
      img: wish.product.img,
    },
  }

  return (
    <UserPanelLayout>
     <WishlistModel wishlist={formattedWishlist} />
    </UserPanelLayout>
  );
};

export default page;
