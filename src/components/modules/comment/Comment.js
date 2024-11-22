import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({ userName, body, score, date }) => {
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div className="">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-5">
            <strong>{userName}</strong>
            <p>{new Date(date).toLocaleString("fa-IR")}</p>
          </div>
          <div className="flex gap-1 text-amber-400">
            {new Array(score).fill(0).map((item, index) => (
              <FaStar key={index} />
            ))}
            {new Array(5 - score).fill(0).map((item, index) => (
              <FaRegStar key={index} />
            ))}
          </div>
        </div>

        <p>{body}</p>
      </div>
    </section>
  );
};

export default Comment;
