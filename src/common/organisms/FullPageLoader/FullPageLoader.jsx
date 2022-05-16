import { Loader } from "../../atoms/Loader/Loader";
import styles from "./FullPageLoader.module.scss";

export const FullPageLoader = () => {
  return (
    <div className={styles.page}>
      <Loader />
    </div>
  );
};
