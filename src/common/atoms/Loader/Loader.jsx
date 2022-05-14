import React from "react";
import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
    </div>
  );
}
