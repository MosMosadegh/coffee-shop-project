import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/tickets/table.module.css";
import Table from "@/components/templates/p-admin/tickets/Table";
import connectToDb from "@/configs/db";
import TicketModel from "@/models/Ticket";

const page = async () => {
   await connectToDb();
  const tickets = await TicketModel.find({isAnswer: false})
.sort({_id: -1})
  .populate("user", "name email phone")
  .populate("department", "title")
  .lean();

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <Table
          tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست تیکتها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
