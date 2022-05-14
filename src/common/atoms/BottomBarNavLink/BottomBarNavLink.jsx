import React from "react";
import { CustomNavLink } from "../../../helper/CustomNavLink";
import styles from "./BottomBarNavLink.module.scss";

export const BottomBarNavLink = ({ path, children }) => {
  return (
    <CustomNavLink
      activeClassName={styles.active__link}
      className={styles.link}
      inactiveClassName={styles.inactive__link}
      to={path}
    >
      {children}
    </CustomNavLink>
  );
};
