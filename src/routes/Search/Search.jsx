import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RightSideBar } from "../../common";
import styles from "./Search.module.scss";

export const Search = () => {
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, []);

  useEffect(() => {
    if (screenWidth >= 1200) {
      navigate("/home");
    }
  }, [navigate, pathname, screenWidth]);

  return (
    <div className={styles.search__page}>
      {screenWidth < 1200 && <RightSideBar />}
    </div>
  );
};
