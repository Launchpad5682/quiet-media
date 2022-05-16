import { Children } from "react";
import styles from "./IconButton.module.scss";

export const IconButton = ({ icon, clickHandler = () => {}, children }) => {
  return (
    <span onClick={clickHandler} className={styles.icon__button}>
      {icon}
      {children}
    </span>
  );
};
