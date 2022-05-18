import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Post, UserProfile } from "../../common";
import { firestoreDB } from "../../firebase";
import styles from "./User.module.scss";

const postsRef = collection(firestoreDB, "posts");

export const User = () => {
  const { pathname } = useLocation();
  const userInformation = useSelector((store) => store.userInformation);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setCurrentUsername(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    let unsubscribe = () => {};

    if (currentUsername) {
      const postsRefQuery = query(
        postsRef,
        where("username", "in", [currentUsername]),
        orderBy("createdAt", "desc"),
        limit(30)
      );
      unsubscribe = onSnapshot(postsRefQuery, (docs) => {
        // console.log(lastVisited);
        const fetchedPosts = [];

        docs.forEach((doc) => {
          fetchedPosts.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toString(),
          });
        });
        setPosts(fetchedPosts);

        // setLastVisited(docs.data()[docs.data().length - 1]);
      });
    }

    return () => unsubscribe();
  }, [currentUsername]);

  return (
    <div className={styles.user__page}>
      <UserProfile
        currentUsername={currentUsername}
        userInformation={userInformation}
      />
      <div className={styles.posts}>
        {posts?.length > 0 &&
          posts.map((post) => (
            <Post key={`${post.createdAt}_${post.uid}`} post={post} />
          ))}
      </div>
    </div>
  );
};
