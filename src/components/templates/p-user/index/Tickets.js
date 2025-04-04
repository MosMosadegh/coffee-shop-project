import Ticket from "../tickets/Ticket";
import styles from "./tickets.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Tickets = ({ ticket }) => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      {ticket.map((item) => (
        <Ticket key={item._id} {...item} />
      ))}

      {!ticket.length && <p className={styles.empty}>تیکتی ثبت نشده</p>}
    </div>
  );
};

export default Tickets;
