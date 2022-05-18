import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { firestoreDB } from "../firebase";

const postsRef = collection(firestoreDB, "posts");

export const usePosts = ({
  username = null,
  sortBy,
  following = null,
  updateHandler,
}) => {
  // const [lastVisited, setLastVisited] = useState(0);
  // const [prevSortBy, setPrevSortBy] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    if (username && sortBy === "latest") {
      const postsRefQuery = query(
        postsRef,
        where("username", "in", [username, ...following]),
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
        updateHandler(fetchedPosts);

        // setLastVisited(docs.data()[docs.data().length - 1]);
      });
    } else if (username && sortBy === "trending") {
      const postsRefQuery = query(
        postsRef,
        where("username", "in", [username, ...following]),
        orderBy("likesCount", "desc"),
        limit(30)
      );
      unsubscribe = onSnapshot(postsRefQuery, (docs) => {
        const fetchedPosts = [];
        docs.forEach((doc) =>
          fetchedPosts.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toString(),
          })
        );
        updateHandler(fetchedPosts);
      });
    } else if (username === null && following == null) {
      if (sortBy === "latest") {
        const postsRefQuery = query(
          postsRef,
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
          updateHandler(fetchedPosts);

          // setLastVisited(docs.data()[docs.data().length - 1]);
        });
      } else if (sortBy === "trending") {
        const postsRefQuery = query(
          postsRef,
          orderBy("likesCount", "desc"),
          limit(30)
        );
        unsubscribe = onSnapshot(postsRefQuery, (docs) => {
          const fetchedPosts = [];
          docs.forEach((doc) =>
            fetchedPosts.push({
              _id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate().toString(),
            })
          );
          updateHandler(fetchedPosts);
        });
      }
    }
    return () => unsubscribe();
  }, [username, sortBy, following, updateHandler]);

  return {};
};
