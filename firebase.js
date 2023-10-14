import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKo0LQqjUr4pFTPyQ5n3yWCeFGzLRJ5NQ",
  authDomain: "chat-app-9b8d8.firebaseapp.com",
  projectId: "chat-app-9b8d8",
  storageBucket: "chat-app-9b8d8.appspot.com",
  messagingSenderId: "574343739887",
  appId: "1:574343739887:web:9c6eca07a7b9bd750b9e1a",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
};
