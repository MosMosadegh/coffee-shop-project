import Layout from "@/components/layouts/UserPanelLayout";

import { authUser } from "@/utils/isLogin";
import TicketModel from "@/models/Ticket";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDb from "@/configs/db";

const page = async () => {
  await connectToDb();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false }).populate(
    "department",
    "title"
  ).sort({_id: -1});
 
  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
