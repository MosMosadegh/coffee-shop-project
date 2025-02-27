import Layout from "@/components/layouts/UserPanelLayout";
import TicketModel from "@/models/Ticket";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session.user;


  const tickets = await TicketModel.find({ user: user.id, isAnswer: false })
    .populate("department", "title")
    .sort({ _id: -1 });

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
