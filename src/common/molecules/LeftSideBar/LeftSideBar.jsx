import React from "react";
import { SideBarNavLink } from "../../atoms/SideBarNavLink/SideBarNavLink";
import styles from "./LeftSideBar.module.scss";
import { AiOutlineHome, AiOutlineRocket } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { SolidButton } from "../../";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../organisms/Modal/ModalSlice";

export const LeftSideBar = () => {
  const dispatch = useDispatch();
  const createPost = () => dispatch(setModal({ type: "post", edit: false }));
  const username = useSelector((store) => store.userInformation.username);

  return (
    <div className={styles.left__sidebar}>
      <div className={styles.logo}>
        <div className="h4__typography typogrpahy--white bold--typography">
          Quiet
        </div>
      </div>
      <div className={styles.nav__container}>
        <SideBarNavLink path="/home">
          <AiOutlineHome />
          Home
        </SideBarNavLink>
        <SideBarNavLink path="/explore">
          <AiOutlineRocket />
          Explore
        </SideBarNavLink>
        <SideBarNavLink path="/bookmarks">
          <BsBookmark />
          Bookmarks
        </SideBarNavLink>
        <SideBarNavLink path="/notifications">
          <IoNotificationsOutline />
          Notifications
        </SideBarNavLink>
        <SideBarNavLink path={`/user/${username}`}>
          <CgProfile />
          Profile
        </SideBarNavLink>
      </div>
      <SolidButton
        fullWidth={true}
        buttonText="Create Post"
        clickHandler={createPost}
      />
      <ProfileCard />
    </div>
  );
};
