import styles from "./Tab.module.scss";

export const TabElement = ({
  clickHandler = () => {},
  displayName,
  active = false,
}) => {
  return (
    <div
      className={`${styles.tab} ${active && styles.active}`}
      onClick={clickHandler}
    >
      {displayName}
    </div>
  );
};
