import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Login } from "./routes/Auth/Login/Login";
import { SignUp } from "./routes/Auth/SignUp/SignUp";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestoreDB } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthenticated, updateUserData } from "./routes/Auth/AuthSlice";
import { Home } from "./routes/Home/Home";
import { Layout } from "./common";
import { PrivateRoute } from "./helper/PrivateRoute";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setUserInformation } from "./routes/UserProfile/UserSlice";
import { Modal } from "./common/organisms/Modal/Modal";
import { Landing } from "./routes/Landing/Landing";

function App() {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;

        (async () => {
          const docRef = query(
            collection(firestoreDB, "users"),
            where("uid", "==", uid)
          );

          const userInformation = await getDocs(docRef);
          // it'll only have one doc
          userInformation.forEach((doc) => {
            console.log(doc.data());
            dispatch(setUserInformation({ ...doc.data() }));
          });
        })();
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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
              {modal.type !== null && <Modal />}
            </PrivateRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<>Explore</>} />
          <Route path="bookmarks" element={<>Bookmark</>} />
          <Route path="notifications" element={<>Notification</>} />
          <Route path="profile" element={<>Profile</>} />
          <Route path="/user/:userid" element={<></>} />
          <Route path="/post/:postid" element={<></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
