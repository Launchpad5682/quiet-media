import { useEffect, useRef, useState } from "react";
import styles from "./TextBoxField.module.scss";

export const TextBoxField = ({ value, changeHandler, count }) => {
  const textareaRef = useRef(null);
  //   useEffect(() => {
  //     if (textareaRef) {
  //       textareaRef.current.style.height = "inherit";
  //     }
  //     return () => {};
  //   }, [textareaRef]);

  return (
    <textarea
      className={`${styles.textarea__element} ${
        count >= 200 && styles.text__overflow
      }`}
      placeholder="What's happening"
      ref={textareaRef}
      onChange={changeHandler}
      value={value}
    />
  );
};

// <textarea className={styles.textarea} />
