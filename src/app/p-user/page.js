import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishlistModel from "@/models/Wishlist";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const page = async () => {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login-register");
  // }
  const user = session.user;

  const ticket = await TicketModel.find({ user: user.id })
    .populate("department", "title")
    .sort({ _id: -1 })
    .limit(3)
    .lean();

  const allTicket = await TicketModel.find({ user: user.id });
  const allComment = await CommentModel.find({ user: user.id });
  const allWishlist = await WishlistModel.find({ user: user.id });
  const allOrder = await WishlistModel.find({ user: user.id });

  return (
    <>
      <Layout>
        <main className="">
          <section className={styles.boxes}>
            <Box title="مجموع تیکت ها " value={allTicket.length} />
            <Box title="مجموع کامنت ها " value={allComment.length} />
            <Box title="مجموع سفارشات" value="2" />
            <Box title="مجموع علاقه مندی ها" value={allWishlist.length} />
          </section>
          <section className={styles.contents}>
            <Tickets ticket={ticket} />
            <Orders orders={allOrder} />
          </section>
        </main>
      </Layout>
    </>
  );
};

export default page;
