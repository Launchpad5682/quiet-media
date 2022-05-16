import React from "react";
import { CustomNavLink } from "../../../helper/CustomNavLink";
import styles from "./SideBarNavLink.module.scss";

export const SideBarNavLink = ({ path, children }) => {
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
