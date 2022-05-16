import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../common";
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
  const { username, following } = useSelector((store) => store.userInformation);

  const fetchByLatest = () => {
    console.log("executing fetch by latest");
    dispatch(postsSortBy("latest"));
    const postsRefQuery = query(
      postsRef,
      where("username", "in", [username, ...following]),
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
          _id: doc.id,
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
      where("username", "in", [username, ...following]),
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
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toString(),
        })
      );
      // console.log(fetchedPosts);
      dispatch(setPosts(fetchedPosts));
    })();
  };

  useEffect(() => {
    // dispatch();
    console.log("fetching by latest at first from loading");
    fetchByLatest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className={styles.home}>
      <TextBox />
      <HomeTabs active={sortBy} handlers={[fetchByLatest, fetchByTrending]} />
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={`${post.createdAt}_${post.uid}`} post={post} />
        ))}
      </div>
    </div>
  );
};
