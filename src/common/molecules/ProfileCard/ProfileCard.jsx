import { Avatar } from "../../atoms/Avatar/Avatar";
import { IoIosOptions } from "react-icons/io";
import styles from "./ProfileCard.module.scss";

export const ProfileCard = () => {
  return (
    <div className={styles.profile__card}>
      <Avatar size="sm" />
      <div className={styles.profile__name}>
        <span className="h6__typography bold--typography">Saurabh Suthar</span>
        <span className="subtitle1__typography">@saurabh22suthar</span>
      </div>
      <span className={styles.option}>
        <IoIosOptions />
      </span>
    </div>
  );
};
