import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Post, TextBox, HomeTabs } from "../../common";
import { firestoreDB } from "../../firebase";
import styles from "./Home.module.scss";

const postsRef = collection(firestoreDB, "posts");

export const Home = () => {
  const { username, following } = useSelector((store) => store.userInformation);

  // const updateHandler = (fetchedPosts) => {
  //   dispatch(setPosts(fetchedPosts));
  //   dispatch(stopLoadingPosts());
  // };

  // usePosts({ username, sortBy, following, updateHandler });

  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const target = entries[0];
      // console.log("intersection happeing");
      if (target.isIntersecting) {
        // console.log("hitting the bottom of the posts");
      }
    })
  );

  const fetchByLatest = () => {
    setSortBy("latest");
  };

  const fetchByTrending = () => {
    setSortBy("trending");
  };

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (username && sortBy === "latest") {
      setLoading(true);
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
        // updateHandler(fetchedPosts);
        setPosts(fetchedPosts);
        setLoading(false);

        // setLastVisited(docs.data()[docs.data().length - 1]);
      });
    } else if (username && sortBy === "trending") {
      setLoading(true);
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
        setPosts(fetchedPosts);
        setLoading(false);
      });
    }
    return () => unsubscribe();
  }, [following, sortBy, username]);

  return (
    <div className={styles.home}>
      <TextBox />
      <HomeTabs active={sortBy} handlers={[fetchByLatest, fetchByTrending]} />
      <div className={styles.posts}>
        {loading && <Loader />}
        {posts?.length > 0 &&
          posts.map((post, index) =>
            index === posts.length - 1 ? (
              <Post key={`${post._id}`} post={post} ref={setLastElement} />
            ) : (
              <Post key={`${post._id}`} post={post} ref={null} />
            )
          )}
      </div>
    </div>
  );
};
