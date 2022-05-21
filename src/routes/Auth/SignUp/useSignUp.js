import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestoreDB } from "../../../firebase";

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const changeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "fullname":
        setFormData((prev) => ({ ...prev, fullName: value }));
        break;
      case "username":
        setFormData((prev) => ({ ...prev, username: value }));
        break;
      case "email":
        setFormData((prev) => ({ ...prev, email: value }));
        break;
      case "password":
        setFormData((prev) => ({ ...prev, password: value }));
        break;
      default:
        new Error("Not a valid input handler");
    }
  };

  const createUser = async (fullName, username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: "",
      });
      navigate("/home");
      await setDoc(doc(firestoreDB, "users", username), {
        username: username,
        displayName: fullName,
        photoURL: null,
        backgroundImageURL: null,
        bio: null,
        portfolioURL: null,
        posts: [],
        followers: [],
        following: [],
        uid: auth.currentUser.uid,
        bookmarkPosts: [],
        notifications: [],
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { fullName, username, email, password } = formData;
    setLoading(true);
    await createUser(fullName, username, email, password);
    setFormData({ fullName: "", username: "", email: "", password: "" });
  };

  return { formData, loading, changeHandler, submitHandler };
};
