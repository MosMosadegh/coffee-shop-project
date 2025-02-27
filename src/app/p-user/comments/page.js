import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import CommentModel from "@/models/Comment";
import styles from "@/styles/p-user/dataTable.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session.user;

  const comments = await CommentModel.find({ user: user.id }, "-__v").populate(
    "productID",
    "name"
  );

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
