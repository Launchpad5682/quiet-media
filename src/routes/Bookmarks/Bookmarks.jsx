import {
  collection,
  documentId,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Post } from "../../common";
import { firestoreDB } from "../../firebase";
import styles from "./Bookmarks.module.scss";

const postsRef = collection(firestoreDB, "posts");
export const Bookmarks = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { username, bookmarkPosts } = useSelector(
    (store) => store.userInformation
  );

  useEffect(() => {
    let unsubscribe = () => {};
    if (bookmarkPosts.length > 0) {
      setLoading(true);
      const postsRefQuery = query(
        postsRef,
        where(documentId(), "in", bookmarkPosts),
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
        setLoading(false);
        // setLastVisited(docs.data()[docs.data().length - 1]);
      });
    }
    if (bookmarkPosts.length === 0) {
      setPosts([]);
    }
    return () => unsubscribe();
  }, [bookmarkPosts, username]);

  return (
    <div className={styles.posts}>
      {loading && <Loader />}
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Post key={`${post.createdAt}_${post.uid}`} post={post} />
        ))
      ) : (
        <span className={`h6__typography ${styles.no__bookmark}`}>
          No Bookmarks to show
        </span>
      )}
    </div>
  );
};
