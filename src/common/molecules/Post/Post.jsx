import { Avatar } from "../../atoms/Avatar/Avatar";
import { BsShareFill, BsThreeDots } from "react-icons/bs";
import styles from "./Post.module.scss";
import { useRef, useState } from "react";
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
import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDB, storage } from "../../../firebase";
import { setModal } from "../../organisms/Modal/ModalSlice";
import { deleteObject, ref } from "firebase/storage";
import { deletePost } from "../../../routes/Home/HomeSlice";

export const Post = ({ post }) => {
  const [dropdown, setDropdown] = useState(false);
  const {
    _id,
    username,
    displayName,
    uid,
    likesCount,
    createdAt,
    content,
    imageURL,
    comments,
  } = post;

  console.log(post);
  const ownUID = useSelector((store) => store.userInformation.uid);

  const dropdownRef = useRef(null);
  const dropdownOpenHandler = () => setDropdown(true);
  const dropdownCloseHandler = () => setDropdown(false);
  useOnClickOutside(dropdownRef, dropdownCloseHandler);
  const dispatch = useDispatch();
  //TODO
  const liked = false;
  const bookmarked = false;
  const likeHandler = () => {};
  const commentHandler = () => {};
  const bookmarkHandler = () => {};
  const shareHandler = () => {};

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
      dispatch(deletePost({ _id }));
      dropdownCloseHandler();
    } catch (error) {
      console.log("unable to delete");
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <div className={styles.profile} onClick={() => {}}>
          <Avatar />
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
              {ownUID === uid ? (
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
                <OptionItem>Follow @{username}</OptionItem>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.post__body}>
        <div className="body1__typography">{content}</div>
        <div className={styles.image__container}>
          {imageURL && <img src={imageURL} alt="" className="image__fit" />}
        </div>
        <div className="subtitle2__typography">{createdAt}</div>
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
        <IconButton icon={<BsShareFill />} clickHandler={shareHandler} />
      </div>
    </div>
  );
};
