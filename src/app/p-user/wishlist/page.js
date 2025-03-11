import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import WishlistModel from "@/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session.user;

  const wishlist = await WishlistModel.find({ user: user.id }).populate(
    "product"
  );

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span className="dark:bg-slate-600">علاقه مندی ها</span>
        </h1>
        <div className="mb-5 px-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 child:bg-white child:dark:bg-zinc-700 child:rounded-2xl child:shadow-normal">
          {wishlist.length &&
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                productID={String(wish.product._id)}
                name={wish.product.name}
                price={wish.product.price}
                score={wish.product.score}
                img={wish.product.img}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
