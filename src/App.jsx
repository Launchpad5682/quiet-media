import styles from "./App.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestoreDB } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthenticated, updateUserData } from "./routes/Auth/AuthSlice";
import { Modal, Layout } from "./common";
import { PrivateRoute } from "./helper/PrivateRoute";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { setUserInformation } from "./routes/User/UserSlice";
import {
  Home,
  Login,
  SignUp,
  SinglePagePost,
  Explore,
  Bookmarks,
  User,
} from "./routes";
import { Search } from "./routes/Search/Search";

function App() {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let unsubscribeListner = () => {};
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;

        (async () => {
          const docRef = query(
            collection(firestoreDB, "users"),
            where("uid", "==", uid)
          );

          unsubscribeListner = onSnapshot(docRef, (docs) => {
            docs.forEach((doc) => {
              dispatch(setUserInformation({ ...doc.data() }));
            });
          });
        })();
        dispatch(updateAuthenticated({ authenticated: true, loading: false }));
        dispatch(updateUserData({ displayName, uid, photoURL, email }));
        navigate("/home");
      } else {
        dispatch(updateAuthenticated({ authenticated: false, loading: false }));
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
      unsubscribeListner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const route = pathname.split("/")[1];
    if (
      route === "home" ||
      route === "search" ||
      route === "explore" ||
      route === "post" ||
      route === "bookmarks" ||
      route === "login" ||
      route === "signup"
    ) {
      document.title = route[0].toUpperCase() + route.slice(1);
    } else if (route === "user") {
      const subroute = pathname.split("/")[2];
      document.title = subroute;
    }
  }, [pathname]);

  return (
    <div className={styles.App}>
      <Routes>
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
          <Route path="explore" element={<Explore />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="notifications" element={<>Notification</>} />
          <Route path="/user/:userid" element={<User />} />
          <Route path="/post/:postid" element={<SinglePagePost />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
