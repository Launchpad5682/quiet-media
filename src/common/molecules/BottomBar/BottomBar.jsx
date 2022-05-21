import styles from "./BottomBar.module.scss";

import { AiOutlineHome, AiOutlineRocket } from "react-icons/ai";
import { BsBookmark, BsSearch } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { BottomBarNavLink } from "../../atoms/BottomBarNavLink/BottomBarNavLink";

export const BottomBar = () => {
  return (
    <div className={styles.bottom__bar}>
      <BottomBarNavLink path="/home">
        <AiOutlineHome />
      </BottomBarNavLink>
      <BottomBarNavLink path="/explore">
        <AiOutlineRocket />
      </BottomBarNavLink>
      <BottomBarNavLink path="/bookmarks">
        <BsBookmark />
      </BottomBarNavLink>
      <BottomBarNavLink path="/search">
        <BsSearch />
      </BottomBarNavLink>
      {/* <BottomBarNavLink path="/notifications">
        <IoNotificationsOutline />
      </BottomBarNavLink> */}
    </div>
  );
};
