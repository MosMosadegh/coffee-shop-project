import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
    console.log("🚀 ~ page ~ session:", session)
    const accessToken = session.user.accessToken;
    // console.log("🚀 ~ page ~ userId:", accessToken)

  //  const refreshToken = cookies().get("refresh-token")?.value;
    //console.log("🚀 ~ AccountDetails ~ refreshToken:", refreshToken)
  return (
    <Layout>
      <AccountDetails accessToken={accessToken} />
    </Layout>
  );
};

export default page;
