import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../atoms/Header/Header";
import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { LeftSideBar } from "../../molecules/LeftSideBar/LeftSideBar";
import { RightSideBar } from "../../molecules/RightSideBar/RightSideBar";
import styles from "./Layout.module.scss";

export const Layout = () => {
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, []);

  return (
    <div className={styles.page}>
      {screenWidth <= 1000 && <Header />}
      <main className={styles.main}>
        {screenWidth > 1000 && <LeftSideBar />}
        <Outlet />
        {screenWidth > 1200 && <RightSideBar />}
      </main>
      {screenWidth <= 1000 && <BottomBar />}
    </div>
  );
};
