import React from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import styles from "./SearchBar.module.scss";
import { useSearchBar } from "./useSearchBar";

export function SearchBar() {
  const { searchInput, changeHandler, clearHandler, searchClickHandler } =
    useSearchBar();

  return (
    <div className={styles.search__container}>
      <input
        type="text"
        name=""
        id=""
        className={styles.search__input}
        onChange={changeHandler}
        value={searchInput}
        placeholder="Search"
      />
      <span className={styles.search__btn}>
        {searchInput.length > 0 && (
          <span
            className="subtitle1__typography typography--white"
            onClick={clearHandler}
          >
            <BsXLg />
          </span>
        )}
        <span
          className="subtitle1__typography"
          onClick={() => searchClickHandler(searchInput)}
        >
          <BsSearch />
        </span>
      </span>
    </div>
  );
}
