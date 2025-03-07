import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";

const page = async ({ params }) => {
  const ticketID = params.id;
  await connectToDb();

  const ticket = await TicketModel.findOne({ _id: ticketID }).populate('user').lean();
  const answerTicket = await TicketModel.findOne({ mainTicket: ticketID }).populate('user').lean();

  //console.log("Tikcet=>>", ticket);
  //console.log("AnswerTicket=>>", answerTicket);

  return (
    <Layout>
      <main className="container">
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" {...ticket} />
          {answerTicket && <Answer type="admin" {...answerTicket} />}

          {!answerTicket && (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;
