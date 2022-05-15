import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`header ${styles.header__dark}`}>
      <h6 className="h6__typography typography--white">Project Name</h6>
      <nav className="header__nav">
        <ul className="nav__list">
          <li className="subtitle1__typography typography--white navlist__item">
            Home
          </li>
          <li className="subtitle1__typography typography--white navlist__item">
            Gallery
          </li>
          <li className="subtitle1__typography typography--white navlist__item">
            About
          </li>
        </ul>
      </nav>
      <span className="sm-avatar round fit-image">
        <img
          src="https://images.unsplash.com/photo-1602870049368-9c8265ff3693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          className="img-fit round sm-avatar"
          alt=""
        />
      </span>
    </header>
  );
};
