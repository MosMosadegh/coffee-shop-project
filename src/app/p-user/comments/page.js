import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authUser } from "@/utils/isLogin";
import styles from "@/styles/p-user/dataTable.module.css";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const comments = await CommentModel.find(
    { user: String(user._id) },
    "-__v"
  ).populate("productID", "name");



  return (
    <Layout>
      <main>
        {comments.length > 0 ? (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        ) : (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        )}
      </main>
    </Layout>
  );
};

export default page;
