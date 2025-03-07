import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Product from "@/components/modules/product/Product";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login-register");
  }
  const user = session.user;

  let wishes = [];

  if (user) {
    wishes = await WishlistModel.find({ user: user.id })
      .populate("product", "name price score")
      .lean();
  }

  return (
    <>
      <Breadcrumb route={"علاقه مندی ها"} />
      <main data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
