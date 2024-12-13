import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comment/table.module.css";
import Table from "@/components/templates/p-admin/comment/Table";
import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";

const page = async () => {
  await connectToDb();
  const comments = await CommentModel.find({})
    .sort({ _id: -1 })
    .populate("user")
    .populate("productID", "name")
    .lean();

  console.log("comments=>>", comments);

  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table
            comments={JSON.parse(JSON.stringify(comments))}
            title= "لیست کامنت ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
