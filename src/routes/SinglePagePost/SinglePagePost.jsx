import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader, Post, Comment, CommentBox } from "../../common";
import { firestoreDB } from "../../firebase";

import styles from "./SinglePagePost.module.scss";

export const SinglePagePost = () => {
  const { pathname } = useLocation();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const id = pathname.split("/")[2];

    let unsubscribe = () => {};
    (async () => {
      const docRef = doc(firestoreDB, "posts", id);

      unsubscribe = onSnapshot(docRef, (doc) => {
        console.log(doc.data());
        setPost({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toString(),
        });
      });
    })();

    return () => unsubscribe();
  }, [pathname]);

  return (
    <div className={styles.single__page__post}>
      {post ? (
        <div className={styles.single__post}>
          <Post key={`${post.createdAt}_${post.uid}`} post={post} />
          <CommentBox _id={post._id} comments={post.comments} />
          <div className={styles.comments__container}>
            {post?.comments?.map((_id) => (
              <Comment _id={_id} />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
