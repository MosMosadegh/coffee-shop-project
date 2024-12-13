import Link from "next/link";
import styles from "./ticket.module.css";

const Ticket = ({ title, hasAnswer, createdAt }) => {
  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title} </p>
        <p className={styles.department}>واحد پشتیبانی</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.no_answer}>{hasAnswer ? "پاسخ داده شده ": "پاسخ داده نشده "}</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
