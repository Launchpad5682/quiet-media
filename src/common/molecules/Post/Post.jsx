import { Avatar } from "../../atoms/Avatar/Avatar";
import { BsThreeDots } from "react-icons/bs";
import styles from "./Post.module.scss";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLike,
  AiTwotoneLike,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { IconButton } from "../../atoms/Button/IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { OptionItem } from "../../atoms/OptionItem/OptionItem";
import { deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestoreDB, storage } from "../../../firebase";
import { setModal } from "../../organisms/Modal/ModalSlice";
import { deleteObject } from "firebase/storage";
import { useFollow } from "../../../hooks/useFollow";
import { useNavigate } from "react-router-dom";

const formatDate = (createdAt) => {
  const dateArr = createdAt.split(" ");
  const time = dateArr[4].split(":").slice(0, -1).join(":");
  const date = dateArr.slice(1, 4).join(" ");
  return `${time} ${date}`;
};

export const Post = forwardRef(({ post }, ref) => {
  const [dropdown, setDropdown] = useState(false);
  const {
    _id,
    username,
    displayName,
    likes,
    likesCount,
    createdAt,
    content,
    imageURL,
    comments,
  } = post;

  const navigate = useNavigate();

  const loggedInUser = useSelector((store) => store.userInformation);

  const [selectedUser, setSelectedUser] = useState(null);
  const { follow, selfMode, followUser, unFollowUser, setSelfMode } = useFollow(
    {
      loggedInUser,
      selectedUser,
    }
  );

  const dropdownRef = useRef(null);
  const dropdownOpenHandler = () => setDropdown(true);
  const dropdownCloseHandler = () => setDropdown(false);
  useOnClickOutside(dropdownRef, dropdownCloseHandler);
  const dispatch = useDispatch();
  //TODO
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const likeHandler = async () => {
    const docRef = doc(firestoreDB, "posts", _id);
    if (liked) {
      // unlike
      await setDoc(
        docRef,
        {
          likesCount: likesCount - 1,
          likes: likes.filter((username) => username !== loggedInUser.username),
        },
        { merge: true }
      );
    } else {
      // like
      await setDoc(
        docRef,
        {
          likesCount: likesCount + 1,
          likes: [...likes, loggedInUser.username],
        },
        { merge: true }
      );
    }
  };
  const commentHandler = () => navigate(`/post/${_id}`);
  const bookmarkHandler = async () => {
    const { username, bookmarkPosts } = loggedInUser;
    const docRef = doc(firestoreDB, "users", username);
    if (bookmarked) {
      // un-bookmark
      await setDoc(
        docRef,
        {
          bookmarkPosts: bookmarkPosts.filter((id) => id !== _id),
        },
        { merge: true }
      );
    } else {
      // like
      await setDoc(
        docRef,
        {
          bookmarkPosts: [...bookmarkPosts, _id],
        },
        { merge: true }
      );
    }
  };
  // TODO
  // const shareHandler = () => {};

  const followHandler = () => {
    if (follow) {
      unFollowUser();
    } else {
      followUser();
    }
    dropdownCloseHandler();
  };

  //posts
  const editHandler = () => {
    dispatch(setModal({ type: "post", edit: true, _id: _id }));
    dropdownCloseHandler();
  };

  const deleteHandler = async () => {
    try {
      // delete image stored if any
      await deleteDoc(doc(firestoreDB, "posts", _id));
      if (imageURL) {
        const desertRef = ref(storage, post.imageURL);
        await deleteObject(desertRef);
      }
      dropdownCloseHandler();
    } catch (error) {
      console.log("unable to delete");
    }
  };

  useEffect(() => {
    let unsubscribe = () => {};
    if (username && loggedInUser) {
      const docRef = doc(firestoreDB, "users", username);
      unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setSelfMode(doc.id === loggedInUser.username);
          const user = doc.data();
          setSelectedUser(user);
        } else {
          setSelectedUser(null);
        }
      });
    }
    return () => unsubscribe();
  }, [loggedInUser, setSelfMode, username]);

  useEffect(() => {
    setLiked(likes.includes(loggedInUser.username));
  }, [likes, loggedInUser.username]);

  useEffect(() => {
    setBookmarked(loggedInUser.bookmarkPosts.includes(_id));
  }, [_id, loggedInUser.bookmarkPosts]);

  return (
    <div className={styles.post} ref={ref}>
      <div className={styles.post__header}>
        <div
          className={styles.profile}
          onClick={() => navigate(`/user/${username}`)}
        >
          <Avatar
            imgURL={
              selectedUser?.photoURL
                ? selectedUser.photoURL
                : "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
            }
          />
          <div className={styles.name__container}>
            <span className="subtitle1__typography bold--typography">
              {displayName}
            </span>
            <span className="subtitle2__typography">@{username}</span>
          </div>
        </div>
        <div className={styles.dropdown__container}>
          <BsThreeDots
            className={styles.options}
            onClick={dropdownOpenHandler}
          />
          {dropdown && (
            <div className={styles.dropdown} ref={dropdownRef}>
              {selfMode ? (
                <>
                  <OptionItem clickHandler={editHandler}>
                    <AiOutlineEdit />
                    Edit Post
                  </OptionItem>
                  <OptionItem clickHandler={deleteHandler}>
                    <AiOutlineDelete />
                    Delete Post
                  </OptionItem>
                </>
              ) : (
                <OptionItem clickHandler={followHandler}>
                  {follow ? "unfollow" : "follow"} @{username}
                </OptionItem>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={styles.post__body}
        onClick={() => navigate(`/post/${_id}`)}
      >
        <div className="body1__typography">{content}</div>
        <div className={styles.image__container}>
          {imageURL && <img src={imageURL} alt="" className="image__fit" />}
        </div>
        <div className="subtitle2__typography">{formatDate(createdAt)}</div>
      </div>
      <div className={styles.bottom}>
        <IconButton
          icon={liked ? <AiTwotoneLike /> : <AiOutlineLike />}
          clickHandler={likeHandler}
        >
          {likesCount}
        </IconButton>
        <IconButton icon={<BiComment />} clickHandler={commentHandler}>
          {comments.length}
        </IconButton>
        <IconButton
          icon={bookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
          clickHandler={bookmarkHandler}
        />
        {/* <IconButton icon={<BsShareFill />} clickHandler={shareHandler} /> */}
      </div>
    </div>
  );
});
