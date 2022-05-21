import { useEffect, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { Avatar } from "../Avatar/Avatar";
import { OptionItem } from "../OptionItem/OptionItem";
import styles from "./Header.module.scss";

export const Header = () => {
  const [backNavigation, setBackNavigation] = useState(false);
  const [header, setHeader] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);
  const { pathname } = useLocation();
  const photoURL = useSelector((store) => store.userInformation.photoURL);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const dropdownHandler = () => setDropdown((prev) => !prev);

  useOnClickOutside(dropdownRef, dropdownHandler);
  const backNavigationHandler = () => navigate(-1);

  const { logout } = useLogout();

  const logoutHandler = () => {
    logout();
    dropdownHandler();
  };

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, []);

  useEffect(() => {
    const type = pathname.split("/")[1];
    if (type === "post" || type === "user") {
      setBackNavigation(true);
      if (type === "post") {
        setHeader("Post");
      } else {
        setHeader(pathname.split("/")[2]);
      }
    } else {
      setBackNavigation(false);
      setHeader(type.charAt(0).toUpperCase() + type.slice(1));
    }
  }, [pathname]);

  return (
    <header className={`header ${styles.header__dark}`}>
      {backNavigation && (
        <BiArrowBack
          className="h6__typography"
          onClick={backNavigationHandler}
        />
      )}
      <h6 className="h6__typography typography--white">{header}</h6>
      <nav className="header__nav"></nav>
      {screenWidth <= 1000 && (
        <span className={styles.avatar__container} onClick={dropdownHandler}>
          <Avatar imgURL={photoURL ? photoURL : ""} />
          {dropdown && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <OptionItem clickHandler={logoutHandler}>
                <AiOutlineLogout /> Logout
              </OptionItem>
            </div>
          )}
        </span>
      )}
    </header>
  );
};
