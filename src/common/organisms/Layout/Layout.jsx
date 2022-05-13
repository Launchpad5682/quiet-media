import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.page}>
      <Outlet />
    </div>
  );
};
