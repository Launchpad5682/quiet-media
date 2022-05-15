import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Login } from "./routes/Auth/Login/Login";
import { SignUp } from "./routes/Auth/SignUp/SignUp";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { updateAuthenticated, updateUserData } from "./routes/Auth/AuthSlice";
import { Home } from "./routes/Home/Home";
import { Layout } from "./common";
import { PrivateRoute } from "./helper/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;
        dispatch(updateAuthenticated({ authenticated: true, loading: false }));
        dispatch(updateUserData({ displayName, uid, photoURL, email }));
      } else {
        dispatch(updateAuthenticated({ authenticated: false, loading: false }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<>This is the test page</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<>Explore</>} />
          <Route path="bookmarks" element={<>Bookmark</>} />
          <Route path="notifications" element={<>Notification</>} />
          <Route path="profile" element={<>Profile</>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
