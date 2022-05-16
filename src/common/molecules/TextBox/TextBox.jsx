import { Avatar } from "../../atoms/Avatar/Avatar";
import { SolidButton } from "../../atoms/Button/SolidButton/SolidButton";
import { TextBoxField } from "../../atoms/TextBoxField/TextBoxField";
import styles from "./TextBox.module.scss";
import { BiImage } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { firestoreDB, storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { validURL } from "../../../helper/validURL";
import { updatePost } from "../../../routes/Home/HomeSlice";

export const TextBox = ({
  closeHandler = () => {},
  post = null,
  edit = false,
  _id = null,
}) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const userInformation = useSelector((store) => store.userInformation);

  useEffect(() => {
    if (edit && post) {
      const { content, imageURL } = post;
      setValue(content);
      setSelectedFile(imageURL);
    }
  }, [post, edit]);

  const changeHandler = (e) => {
    if (e.currentTarget.value.split("").length <= 200) {
      setValue(e.currentTarget.value);
      setCount(e.currentTarget.value.split("").length);
    }
  };

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const removeHandler = () => setSelectedFile(null);

  const submitHandler = async () => {
    if (edit) {
      try {
        setLoading(true);
        let downloadURL = selectedFile;
        if (selectedFile === null && validURL(post.imageURL)) {
          // delete the image
          const desertRef = ref(storage, post.imageURL);
          await deleteObject(desertRef);
        }
        console.log(!validURL(selectedFile));
        console.log(selectedFile !== null);
        if (!validURL(selectedFile) && selectedFile !== null) {
          const storageRef = ref(storage, `uid-${Date.now()}`);
          const updateTask = await uploadBytes(storageRef, selectedFile);
          downloadURL = await getDownloadURL(updateTask.ref);
          console.log("downloading image");
        }
        const docRef = doc(firestoreDB, "posts", _id);
        const updatedPost = {
          ...post,
          content: value,
          imageURL: downloadURL,
        };
        await setDoc(docRef, updatedPost);

        dispatch(
          updatePost({
            post: {
              ...updatedPost,
              createdAt: updatedPost.createdAt.toDate().toString(),
            },
            _id: _id,
          })
        );

        setValue("");
        setCount(0);
        setSelectedFile(null);
        setLoading(false);
        closeHandler();
      } catch (error) {
        console.error("Error editing document: ", error);
      }
    } else {
      try {
        setLoading(true);
        const { displayName, uid, photoURL, username } = userInformation;
        let downloadURL = null;
        if (selectedFile) {
          const storageRef = ref(storage, `uid-${Date.now()}`);
          const updateTask = await uploadBytes(storageRef, selectedFile);
          downloadURL = await getDownloadURL(updateTask.ref);
        }
        await addDoc(collection(firestoreDB, "posts"), {
          displayName,
          photoURL,
          username,
          uid,
          content: value,
          likes: [],
          likesCount: 0,
          comments: [],
          imageURL: downloadURL,
          createdAt: Timestamp.fromDate(new Date()),
        });

        setValue("");
        setCount(0);
        setSelectedFile(null);
        setLoading(false);
        closeHandler();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className={styles.text__box}>
      <div className={styles.avatar__container}>
        <Avatar size="sm" />
      </div>
      <div className={styles.text__container}>
        <TextBoxField
          value={value}
          changeHandler={changeHandler}
          count={count}
        />
        <div className="h6__typography">{count}/200</div>
        {selectedFile && (
          <div className={styles.preview}>
            <img
              src={
                validURL(selectedFile)
                  ? selectedFile
                  : URL.createObjectURL(selectedFile)
              }
              alt="test"
              className={styles.preview}
            />
            <AiOutlineClose className={styles.close} onClick={removeHandler} />
          </div>
        )}
        <div className={styles.button__container}>
          <div className={styles.uploader__button}>
            <span className="h5__typography">
              <BiImage />
            </span>
            <span className="h6__typography">Image/GIF</span>
            <input
              className={styles.input__file}
              type="file"
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg, image/webp"
              onChange={fileChangeHandler}
            />
          </div>
          <SolidButton
            disabled={loading}
            buttonText={loading ? "Posting..." : edit ? "Edit Post" : "Post"}
            clickHandler={() => submitHandler(value)}
          />
        </div>
      </div>
    </div>
  );
};
