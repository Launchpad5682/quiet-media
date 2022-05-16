import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./common/organisms/Modal/ModalSlice";
import { authReducer } from "./routes/Auth/AuthSlice";
import { exploreReducer } from "./routes/Explore/ExploreSlice";
import { homeReducer } from "./routes/Home/HomeSlice";
import { userReducer } from "./routes/UserProfile/UserSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    userInformation: userReducer,
    modal: modalReducer,
    home: homeReducer,
    explore: exploreReducer,
  },
});
