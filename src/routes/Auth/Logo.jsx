import styles from "./Auth.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className="h2__typography typogrpahy--white bold--typography center__typography">
        Quiet
      </span>
      <span className="h6__typography typogrpahy--white bold--typography center__typography">
        A Social Media App
      </span>
    </div>
  );
};
