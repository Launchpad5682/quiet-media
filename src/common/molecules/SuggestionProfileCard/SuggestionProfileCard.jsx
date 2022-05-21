import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../../../hooks/useFollow";
import { Avatar } from "../../atoms/Avatar/Avatar";
import styles from "./SuggestionProfileCard.module.scss";

export const SuggestionProfileCard = ({ profile }) => {
  const userInformation = useSelector((store) => store.userInformation);
  const { username, displayName, photoURL } = profile;
  const navigate = useNavigate();

  const { follow, selfMode, followUser, unFollowUser } = useFollow({
    loggedInUser: userInformation,
    selectedUser: profile,
  });

  const navigateUser = () => {
    navigate(`/user/${username}`);
  };

  const followButtonHandler = () => {
    if (follow) {
      unFollowUser();
    } else {
      followUser();
    }
  };

  return (
    <div className={styles.profile__card}>
      <Avatar size="sm" imgURL={photoURL ? photoURL : ""} />
      <div className={styles.profile__name} onClick={navigateUser}>
        <span className="h6__typography bold--typography">{displayName}</span>
        <span className="subtitle1__typography">@{username}</span>
      </div>
      <span className={styles.follow} onClick={followButtonHandler}>
        {selfMode ? "OWN" : follow ? "following" : "follow"}
      </span>
    </div>
  );
};
