import { useNavigate } from "react-router-dom";
import { SolidButton, InputField, OutlineButton } from "../../../common";
import styles from "../Auth.module.scss";
import { Logo } from "../Logo";
import { useSignUp } from "./useSignUp";

export const SignUp = () => {
  const { formData, loading, changeHandler, submitHandler } = useSignUp();
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <Logo />
      <div className={styles.form__container}>
        <div className="h6__typography typogrpahy--white bold--typography center__typography">
          Signup
        </div>
        <form onSubmit={submitHandler} className={styles.form}>
          <InputField
            name="fullname"
            type="text"
            changeHandler={changeHandler}
            label="Full Name"
            value={formData.fullName}
          />
          <InputField
            name="username"
            type="text"
            changeHandler={changeHandler}
            label="Username"
            value={formData.username}
          />
          <InputField
            name="email"
            type="email"
            changeHandler={changeHandler}
            label="E-mail"
            value={formData.email}
          />
          <InputField
            name="password"
            type="password"
            changeHandler={changeHandler}
            label="Password"
            value={formData.password}
          />
          <SolidButton
            buttonText={loading ? "Signing up..." : "Signup"}
            fullWidth={true}
            disabled={loading}
          />
          <OutlineButton
            buttonText="Already have an account"
            fullWidth={true}
            clickHandler={() => navigate("/login")}
          />
        </form>
      </div>
    </div>
  );
};
