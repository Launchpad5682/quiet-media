import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { firestoreDB } from "../../../firebase";
import { useDebounce } from "../../../hooks/useDebounce";
import { setProfiles } from "../../molecules/RightSideBar/SearchSlice";

export function useSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const debouncedValue = useDebounce(searchInput, 500);

  const changeHandler = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      dispatch(setProfiles({ search: false, profiles: [] }));
    }
  };

  const searchClickHandler = (value) => {
    (async () => {
      console.log("going for search");
      const profilesQuery = query(
        collection(firestoreDB, "users"),
        where(documentId(), ">=", value)
      );
      const snapshot = await getDocs(profilesQuery);

      const profiles = [];

      snapshot.forEach((doc) => profiles.push(doc.data()));

      const filteredProfiles = profiles.filter((profile) =>
        profile.username.includes(value)
      );

      dispatch(setProfiles({ search: true, profiles: filteredProfiles }));
    })();
  };

  const clearHandler = () => {
    setSearchInput("");
    dispatch(setProfiles({ search: false, profiles: [] }));
  };

  useEffect(() => {
    if (debouncedValue) {
      searchClickHandler(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return {
    searchInput,
    changeHandler,
    clearHandler,
    searchClickHandler,
  };
}
