import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";

const page = async () => {
  return (
    <Layout>
      <AccountDetails />
    </Layout>
  );
};

export default page;
