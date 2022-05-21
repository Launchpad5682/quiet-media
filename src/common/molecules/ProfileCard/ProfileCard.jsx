import { Avatar } from "../../atoms/Avatar/Avatar";
import { IoIosOptions } from "react-icons/io";
import styles from "./ProfileCard.module.scss";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { OptionItem } from "../../atoms/OptionItem/OptionItem";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogout } from "../../../hooks/useLogout";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export const ProfileCard = () => {
  const [dropdown, setDropdown] = useState(false);
  const { username, displayName, photoURL } = useSelector(
    (store) => store.userInformation
  );
  const dropdownRef = useRef();

  const { logout } = useLogout();
  const dropdownHandler = () => setDropdown((prev) => !prev);
  useOnClickOutside(dropdownRef, dropdownHandler);
  const logoutHandler = () => {
    logout();
    dropdownHandler();
  };

  return (
    <div className={styles.profile__card} onClick={dropdownHandler}>
      {dropdown && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <OptionItem clickHandler={logoutHandler}>
            <AiOutlineLogout /> Logout
          </OptionItem>
        </div>
      )}
      <Avatar size="sm" imgURL={photoURL ? photoURL : ""} />
      <div className={styles.profile__name}>
        <span className="h6__typography bold--typography">{displayName}</span>
        <span className="subtitle1__typography">@{username}</span>
      </div>
      <span className={styles.option}>
        <IoIosOptions />
      </span>
    </div>
  );
};
