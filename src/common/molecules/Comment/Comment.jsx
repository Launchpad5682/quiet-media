import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestoreDB } from "../../../firebase";
import { Avatar, Loader } from "../../";
import styles from "./Comment.module.scss";
import { timeStampToDisplay } from "../../../helper/timeStampToDisplay";

export const Comment = ({ _id }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const docRef = doc(firestoreDB, "comments", _id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setComment(docSnap.data());
        setLoading(false);
        const { username } = docSnap.data();
        const userRef = doc(firestoreDB, "users", username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const { displayName, photoURL } = userSnap.data();
          setUser({ username, displayName, photoURL });
        }
      } else {
        setLoading(false);
      }
    })();
  }, [_id]);

  return (
    <div className={styles.comment}>
      {comment ? (
        <div className={styles.comment__body}>
          <Avatar imgURL={user?.photoURL} />
          <div className={styles.comment__content}>
            <span className="subtitle1__typography">{user?.displayName}</span>
            <span className="subtitle2__typography">@{user?.username}</span>
            <div className="body1__typography">{comment.comment}</div>
            <span>{timeStampToDisplay(comment.createdAt)}</span>
          </div>
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <>not found</>
      )}
    </div>
  );
};
