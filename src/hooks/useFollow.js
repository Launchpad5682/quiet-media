import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestoreDB } from "../firebase";

export const useFollow = ({ loggedInUser, selectedUser }) => {
  const [follow, setFollow] = useState(false);
  const [selfMode, setSelfMode] = useState(false);

  const followUser = async () => {
    if (loggedInUser && selectedUser) {
      const loggedInUserRef = doc(firestoreDB, "users", loggedInUser.username);
      const currentUserRef = doc(firestoreDB, "users", selectedUser.username);

      const followers = [...selectedUser.followers, loggedInUser.username];
      await updateDoc(loggedInUserRef, {
        following: [...loggedInUser.following, selectedUser.username],
      });

      await updateDoc(currentUserRef, {
        followers: followers,
      });
      setFollow(true);
    }
  };

  const unFollowUser = async () => {
    if (loggedInUser && selectedUser) {
      const loggedInUserRef = doc(firestoreDB, "users", loggedInUser.username);
      const currentUserRef = doc(firestoreDB, "users", selectedUser.username);

      const followers = selectedUser.followers.filter(
        (us) => us !== loggedInUser.username
      );
      await updateDoc(loggedInUserRef, {
        following: loggedInUser.following.filter(
          (us) => us !== selectedUser.username
        ),
      });

      await updateDoc(currentUserRef, {
        followers: followers,
      });
      setFollow(false);
    }
  };

  useEffect(() => {
    if (loggedInUser && selectedUser) {
      const { following } = loggedInUser;

      setFollow(following.includes(selectedUser.username));
      setSelfMode(loggedInUser.username === selectedUser.username);
    }
  }, [loggedInUser, selectedUser]);

  return { follow, selfMode, followUser, unFollowUser, setFollow, setSelfMode };
};
