import { useEffect, useState } from "react";
import { Loader, Post } from "../../common";
import { HomeTabs } from "../../common/molecules/HomeTabs/HomeTabs";
import styles from "../Home/Home.module.scss";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestoreDB } from "../../firebase";

const postsRef = collection(firestoreDB, "posts");

export const Explore = () => {
  // const dispatch = useDispatch();
  // const [lastVisible, setLastVisible] = useState(null);
  // const { posts, loading, sortBy } = useSelector((store) => store.explore);

  // const updateHandler = (fetchedPosts) => {
  //   dispatch(setExplorePosts(fetchedPosts));
  // };

  // usePosts({ sortBy, updateHandler });

  // const fetchByLatest = () => {
  //   dispatch(explorePostsSortBy("latest"));
  // };

  // const fetchByTrending = () => {
  //   dispatch(explorePostsSortBy("trending"));
  // };

  // useEffect(() => {
  //   console.log("fetching by latest at first from loading");

  //   dispatch(explorePostsSortBy("latest"));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchByLatest = () => {
    setSortBy("latest");
  };

  const fetchByTrending = () => {
    setSortBy("trending");
  };

  useEffect(() => {
    let unsubscribe = () => {};
    if (sortBy === "latest") {
      setLoading(true);
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
        // updateHandler(fetchedPosts);
        setPosts(fetchedPosts);
        setLoading(false);

        // setLastVisited(docs.data()[docs.data().length - 1]);
      });
    } else if (sortBy === "trending") {
      setLoading(true);
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
        setPosts(fetchedPosts);
        setLoading(false);
      });
    }
    return () => unsubscribe();
  }, [sortBy]);

  return (
    <div className={styles.home}>
      <HomeTabs active={sortBy} handlers={[fetchByLatest, fetchByTrending]} />
      <div className={styles.posts}>
        {loading && <Loader />}
        {posts?.length > 0 &&
          posts.map((post) => (
            <Post key={`${post.createdAt}_${post.uid}`} post={post} />
          ))}
      </div>
    </div>
  );
};
