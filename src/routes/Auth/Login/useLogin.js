import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { type, value } = e.target;

    switch (type) {
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

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    await login(email, password);
    setFormData({ email: "", password: "" });
  };

  const testLoginHandler = async () => {
    const email = "test36@gmail.com";
    const password = "test36";
    setFormData({ email, password });
  };

  return {
    formData,
    loading,
    changeHandler,
    submitHandler,
    testLoginHandler,
  };
};
