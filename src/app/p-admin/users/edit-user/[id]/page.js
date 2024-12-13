import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";

import UserAccountDetail from "@/components/templates/details/UserAccountDetail";

const page = async ({ params }) => {
  const { id } = params;

  return (
    <Layout>
      <main>
        <UserAccountDetail params={{ id }} />
      </main>
    </Layout>
  );
};

export default page;
