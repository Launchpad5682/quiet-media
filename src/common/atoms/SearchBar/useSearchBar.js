import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { firestoreDB } from "../../../firebase";
import { setProfiles } from "../../molecules/RightSideBar/SearchSlice";

export function useSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      dispatch(setProfiles({ search: false, profiles: [] }));
    }
  };

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      (async () => {
        console.log("going for search");
        const profilesQuery = query(
          collection(firestoreDB, "users"),
          where(documentId(), ">=", searchInput)
        );
        const snapshot = await getDocs(profilesQuery);

        const profiles = [];

        snapshot.forEach((doc) => profiles.push(doc.data()));

        const filteredProfiles = profiles.filter((profile) =>
          profile.username.includes(searchInput)
        );

        dispatch(setProfiles({ search: true, profiles: filteredProfiles }));
      })();
    }
  };

  const searchClickHandler = () => {
    (async () => {
      console.log("going for search");
      const profilesQuery = query(
        collection(firestoreDB, "users"),
        where(documentId(), ">=", searchInput)
      );
      const snapshot = await getDocs(profilesQuery);

      const profiles = [];

      snapshot.forEach((doc) => profiles.push(doc.data()));

      dispatch(setProfiles({ search: true, profiles }));
    })();
  };

  const clearHandler = () => {
    setSearchInput("");
    dispatch(setProfiles({ search: false, profiles: [] }));
  };

  return {
    searchInput,
    changeHandler,
    searchHandler,
    clearHandler,
    searchClickHandler,
  };
}
