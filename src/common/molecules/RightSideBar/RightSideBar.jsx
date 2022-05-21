import {
  collection,
  documentId,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestoreDB } from "../../../firebase";
import { SearchBar } from "../../atoms/SearchBar/SearchBar";
import { SuggestionProfileCard } from "../SuggestionProfileCard/SuggestionProfileCard";
import styles from "./RightSideBar.module.scss";
import { appendProfiles, setProfiles } from "./SearchSlice";

export const RightSideBar = () => {
  const [lastVisited, setLastVisited] = useState(0);
  const authenticated = useSelector(
    (store) => store.authentication.authenticated
  );
  const { username, following } = useSelector((store) => store.userInformation);
  const { search, profiles } = useSelector((store) => store.search);

  const dispatch = useDispatch();

  // TODO: IMPLEMENT PAGINATED REQUESTS
  const paginateProfilesFetch = async () => {
    try {
      const next = query(
        collection(firestoreDB, "users"),
        startAfter(lastVisited),
        limit(5)
      );

      const documentSnapshots = await getDocs(next);

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const profiles = [];
      documentSnapshots.forEach((doc) => profiles.push(doc.data()));
      dispatch(appendProfiles({ profiles }));
      setLastVisited(lastVisible);
    } catch (err) {}
  };

  useEffect(() => {
    // fetch and show more paginated request
    if (authenticated && username && !search) {
      (async () => {
        const firstPage = query(
          collection(firestoreDB, "users"),
          where(documentId(), "not-in", [username, ...following]),
          limit(30)
        );
        const documentSnapshots = await getDocs(firstPage);

        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        const profiles = [];
        documentSnapshots.forEach((doc) => profiles.push(doc.data()));
        // console.log(profiles);
        dispatch(setProfiles({ search: false, profiles: profiles }));
        setLastVisited(lastVisible);
      })();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, username, following, search]);

  return (
    <div className={styles.right__sidebar}>
      <SearchBar />
      <div className={styles.profile__list}>
        {search ? (
          <span className="subtitle1__typography">Search Results</span>
        ) : (
          <span className="subtitle1__typography">Suggestions</span>
        )}
        {profiles?.map((profile) => (
          <SuggestionProfileCard profile={profile} key={profile.username} />
        ))}
      </div>
    </div>
  );
};
