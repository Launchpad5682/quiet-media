import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeTabs } from "../../common/molecules/HomeTabs/HomeTabs";
import { TextBox } from "../../common/molecules/TextBox/TextBox";
import { firestoreDB } from "../../firebase";
import styles from "./Home.module.scss";
import { postsSortBy, setPosts } from "./HomeSlice";

const postsRef = collection(firestoreDB, "posts");

export const Home = () => {
  const dispatch = useDispatch();
  const [lastVisible, setLastVisible] = useState(null);
  const { posts, loading, sortBy } = useSelector((store) => store.home);

  useEffect(() => {
    // dispatch();
    fetchByLatest();
    return () => {};
  }, []);

  const fetchByLatest = () => {
    dispatch(postsSortBy("latest"));
    const postsRefQuery = query(
      postsRef,
      orderBy("createdAt", "desc"),
      limit(5)
    );

    (async () => {
      const postsData = await getDocs(postsRefQuery);
      const postsLastVisibleLatest = postsData.docs[postsData.docs.length - 1];
      console.log(postsLastVisibleLatest);
      setLastVisible(postsLastVisibleLatest);
      // console.log(postsData);
      const fetchedPosts = [];
      postsData.forEach((doc) =>
        fetchedPosts.push({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toString(),
        })
      );
      // console.log(fetchedPosts);
      dispatch(setPosts(fetchedPosts));
    })();
  };

  const fetchByTrending = () => {
    dispatch(postsSortBy("trending"));
    const postsRefQuery = query(
      postsRef,
      orderBy("likesCount", "desc"),
      limit(5)
    );

    (async () => {
      const postsData = await getDocs(postsRefQuery);
      const postsLastVisibleTrending =
        postsData.docs[postsData.docs.length - 1];
      // console.log(postsLastVisibleTrending);
      setLastVisible(postsLastVisibleTrending);
      // console.log(postsData);
      const fetchedPosts = [];
      postsData.forEach((doc) =>
        fetchedPosts.push({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toString(),
        })
      );
      // console.log(fetchedPosts);
      dispatch(setPosts(fetchedPosts));
    })();
  };

  return (
    <div className={styles.home}>
      <TextBox />
      <HomeTabs active={sortBy} handlers={[fetchByLatest, fetchByTrending]} />
      <div>
        {posts.map((post) => (
          <div>{JSON.stringify(post)}</div>
        ))}
      </div>
    </div>
  );
};
