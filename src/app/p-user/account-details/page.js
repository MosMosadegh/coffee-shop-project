import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";
import { cookies } from "next/headers";

const page = () => {
   const refreshToken = cookies().get("refresh-token")?.value;
    console.log("🚀 ~ AccountDetails ~ refreshToken:", refreshToken)
  return (
    <Layout>
      <AccountDetails refreshToken={refreshToken} />
    </Layout>
  );
};

export default page;
