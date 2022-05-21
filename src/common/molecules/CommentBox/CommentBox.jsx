import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firestoreDB } from "../../../firebase";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { SolidButton } from "../../atoms/Button/SolidButton/SolidButton";
import styles from "./CommentBox.module.scss";

export const CommentBox = ({ _id, comments }) => {
  const [value, setValue] = useState({ value: "", count: 0 });
  const { photoURL, username } = useSelector((store) => store.userInformation);

  const submitHandler = async () => {
    try {
      const postRef = doc(firestoreDB, "posts", _id);
      const docRef = await addDoc(collection(firestoreDB, "comments"), {
        username,
        comment: value.value,
        createdAt: Timestamp.fromDate(new Date()),
      });

      await setDoc(
        postRef,
        { comments: [...comments, docRef.id] },
        { merge: true }
      );

      setValue({ value: "", count: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setValue((prev) =>
      value.length >= 100
        ? { ...prev, count: value.length }
        : { value, count: value.length }
    );
  };

  return (
    <div className={styles.comment__box}>
      <div>
        <Avatar imgURL={photoURL} />
      </div>
      <textarea
        className={`${styles.textarea} ${
          value.count >= 100 && styles.textarea__overflow
        }`}
        onChange={changeHandler}
        value={value.value}
      />
      <SolidButton buttonText="Comment" clickHandler={submitHandler} />
    </div>
  );
};
