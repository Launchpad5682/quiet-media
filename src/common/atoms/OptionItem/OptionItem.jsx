import styles from "./OptionItem.module.scss";

export const OptionItem = ({ children, clickHandler }) => {
  return (
    <div className={styles.option} onClick={clickHandler}>
      {children}
    </div>
  );
};
