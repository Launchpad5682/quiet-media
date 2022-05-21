import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { AiFillCamera, AiOutlineDelete } from "react-icons/ai";
import { firestoreDB, storage } from "../../../firebase";
import { validURL } from "../../../helper/validURL";
import { useFollow } from "../../../hooks/useFollow";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { SolidButton } from "../../atoms/Button/SolidButton/SolidButton";
import styles from "./UserProfile.module.scss";

export const UserProfile = ({
  currentUsername = null,
  userInformation = null,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const { follow, selfMode, followUser, unFollowUser, setSelfMode } = useFollow(
    {
      loggedInUser: userInformation,
      selectedUser: user,
    }
  );
  const [count, setCount] = useState(0);

  // image handling
  const [selectedFile, setSelectedFile] = useState({
    backgroundImageURL: null,
    photoURL: null,
  });

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    if (name === "backgroundImg") {
      setSelectedFile((prev) => ({
        ...prev,
        backgroundImageURL: e.target.files[0],
      }));
    } else {
      setSelectedFile((prev) => ({
        ...prev,
        photoURL: e.target.files[0],
      }));
    }
  };

  const deleteHandler = (target) => {
    switch (target) {
      case "backgroundImg":
        setSelectedFile((prev) => ({ ...prev, backgroundImageURL: null }));
        break;
      case "profileImg":
        setSelectedFile((prev) => ({ ...prev, photoURL: null }));
        break;
      default:
        new Error("not a valid delete query");
    }
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    if (name === "description" && value.length <= 200) {
      setCount(value.length);
      setUser((prev) => ({ ...prev, bio: value }));
    } else if (name === "portfolioURL") {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateUploadedFile = async (selectedFile, imageURL) => {
    let downloadURL = selectedFile;
    // nothing changed
    if (selectedFile === imageURL) {
      return imageURL;
    }
    // delete and set to null
    else if (selectedFile === null && validURL(imageURL)) {
      const desertRef = ref(storage, imageURL);
      await deleteObject(desertRef);
      return null;
    }
    // create new by deleting earlier or directly uploading
    else if (selectedFile !== null && !validURL(selectedFile)) {
      if (validURL(imageURL)) {
        const desertRef = ref(storage, imageURL);
        await deleteObject(desertRef);
      }
      console.log(5);
      const storageRef = ref(storage, `uid-${Date.now()}`);
      const updateTask = await uploadBytes(storageRef, selectedFile);
      downloadURL = await getDownloadURL(updateTask.ref);
    }
    return downloadURL;
  };

  const submitHandler = async () => {
    if (selfMode) {
      if (editMode) {
        // do updates
        try {
          const { backgroundImageURL, photoURL } = user;
          console.log("checking bg image");
          const backgroundImageURLUpdated = await updateUploadedFile(
            selectedFile.backgroundImageURL,
            backgroundImageURL
          );
          console.log("checking dp");
          const photoURLUpdated = await updateUploadedFile(
            selectedFile.photoURL,
            photoURL
          );

          setSelectedFile({
            photoURL: photoURLUpdated,
            backgroundImageURL: backgroundImageURLUpdated,
          });

          setUser((prev) => ({
            ...prev,
            backgroundImageURL: backgroundImageURLUpdated,
            photoURL: photoURLUpdated,
          }));

          const docRef = doc(firestoreDB, "users", user.username);

          await setDoc(docRef, {
            ...user,
            backgroundImageURL: backgroundImageURLUpdated,
            photoURL: photoURLUpdated,
          });
        } catch (error) {}
        setEditMode(false);
      } else {
        setEditMode(true);
      }
    } else {
      if (follow) {
        unFollowUser();
      } else {
        followUser();
      }
    }
  };

  // fetching selected user
  useEffect(() => {
    let unsubscribe = () => {};
    if (currentUsername && userInformation) {
      const docRef = doc(firestoreDB, "users", currentUsername);
      unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setSelfMode(doc.id === userInformation.username);
          const user = doc.data();
          setUser(user);
          setSelectedFile({
            backgroundImageURL: user.backgroundImageURL,
            photoURL: user.photoURL,
          });
        } else {
          setUser(null);
        }
      });
    }

    return () => unsubscribe();
  }, [currentUsername, setSelfMode, userInformation]);

  if (user) {
    const {
      username,
      displayName,
      photoURL,
      backgroundImageURL,
      portfolioURL,
      bio,
      followers,
      following,
    } = user;

    const { backgroundImageURL: bgSelectedFile, photoURL: photoSelctedFile } =
      selectedFile;

    return (
      <div className={styles.user__profile}>
        <div className={styles.background__image}>
          {editMode ? (
            <img
              src={
                validURL(bgSelectedFile)
                  ? bgSelectedFile
                  : bgSelectedFile !== null
                  ? URL.createObjectURL(bgSelectedFile)
                  : "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
              }
              alt="background_image"
              className="image__fit"
            />
          ) : (
            <img
              src={
                backgroundImageURL
                  ? backgroundImageURL
                  : "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
              }
              className="image__fit"
              alt="background_image"
            />
          )}

          {editMode && (
            <input
              className={styles.input__file}
              type="file"
              name="backgroundImg"
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg, image/webp"
              onChange={fileChangeHandler}
              // ref={backgroundRef}
            />
          )}
          {editMode && (
            <div className={styles.background__image__uploader}>
              <AiFillCamera />
            </div>
          )}
          {editMode && (
            <span
              className={styles.delete__background}
              onClick={() => deleteHandler("backgroundImg")}
            >
              <AiOutlineDelete />
            </span>
          )}
        </div>
        <span className={styles.avatar__container}>
          {editMode && (
            <div className={styles.profile__image__uploader}>
              <AiFillCamera />
            </div>
          )}
          {editMode && (
            <input
              className={styles.input__file}
              type="file"
              name="profileImg"
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg, image/webp"
              onChange={fileChangeHandler}
            />
          )}
          {editMode && (
            <span
              name="profileImg"
              className={styles.delete__profile}
              onClick={() => deleteHandler("profileImg")}
            >
              <AiOutlineDelete />
            </span>
          )}
          {editMode ? (
            <Avatar
              size="xl"
              imgURL={
                validURL(photoSelctedFile)
                  ? photoSelctedFile
                  : photoSelctedFile === null
                  ? "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
                  : URL.createObjectURL(photoSelctedFile)
              }
            />
          ) : (
            <Avatar
              size="xl"
              imgURL={
                validURL(photoURL)
                  ? photoURL
                  : "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
              }
            />
          )}
        </span>
        <span className={styles.button}>
          {selfMode ? (
            <SolidButton
              buttonText={editMode ? "Save" : "Edit"}
              clickHandler={submitHandler}
            />
          ) : (
            <SolidButton
              buttonText={follow ? "unfollow" : "follow"}
              clickHandler={submitHandler}
            />
          )}
        </span>
        <div className={styles.bio__container}>
          <span className="h5__typography">{displayName}</span>
          <span className="subtitle1__typography">@{username}</span>
          {editMode ? (
            <textarea
              className={`${styles.bio__textarea} ${
                count >= 200 ? styles.overflow__description : ""
              }`}
              placeholder={`Enter your description`}
              name="description"
              value={bio ? bio : ""}
              onChange={changeHandler}
            />
          ) : (
            <span className="body1__typography">{bio}</span>
          )}
          <div className={`subtitle1__typography ${styles.link__container}`}>
            📎:
            {editMode ? (
              <input
                type="url"
                className={styles.link__input}
                name="portfolioURL"
                value={portfolioURL}
                onChange={changeHandler}
                placeholder="Add Portfolio URL"
              ></input>
            ) : (
              <a
                href={portfolioURL}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                {portfolioURL}
              </a>
            )}
          </div>
          <span
            className={`subtitle1__typography ${styles.follower__following}`}
          >
            <span>{followers.length} followers</span>
            <span>{following.length} following</span>
          </span>
        </div>
      </div>
    );
  } else if (user === null) {
    return <>User doesn't exist</>;
  }
  return <>Loading</>;
};
