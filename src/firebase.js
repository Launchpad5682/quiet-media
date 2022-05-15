import { firebaseConfig } from "./config/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
const storage = getStorage(app, "gs://quiet-media.appspot.com/");

export { auth, firestoreDB, storage };
