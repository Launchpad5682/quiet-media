import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./common/organisms/Modal/ModalSlice";
import { authReducer } from "./routes/Auth/AuthSlice";
import { homeReducer } from "./routes/Home/HomeSlice";
import { exploreReducer } from "./routes/Explore/ExploreSlice";
import { userReducer } from "./routes/User/UserSlice";
import { searchReducer } from "./common/molecules/RightSideBar/SearchSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    userInformation: userReducer,
    modal: modalReducer,
    home: homeReducer,
    explore: exploreReducer,
    search: searchReducer,
  },
});
