import { useNavigate } from "react-router-dom";
import { SolidButton, InputField, OutlineButton } from "../../../common";
import styles from "../Auth.module.scss";
import { Logo } from "../Logo";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { formData, loading, changeHandler, submitHandler } = useLogin();
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <Logo />
      <div className={styles.form__container}>
        <div className="h6__typography typogrpahy--white bold--typography center__typography">
          Login
        </div>
        <form onSubmit={submitHandler} className={styles.form}>
          <InputField
            type="email"
            changeHandler={changeHandler}
            label="E-mail"
            value={formData.email}
          />
          <InputField
            type="password"
            changeHandler={changeHandler}
            label="Password"
            value={formData.password}
          />
          <SolidButton
            buttonText={loading ? "Logging in..." : "Login"}
            fullWidth={true}
            disabled={loading}
          />
          <OutlineButton
            buttonText="Create an account"
            fullWidth={true}
            clickHandler={() => navigate("/signup")}
          />
        </form>
      </div>
    </div>
  );
};
