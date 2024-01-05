import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1fkMdZrN4OCpaTZ4dLrj5aUybqnGa0zU",
  authDomain: "hr-firebase-c79e3.firebaseapp.com",
  projectId: "hr-firebase-c79e3",
  storageBucket: "hr-firebase-c79e3.appspot.com",
  messagingSenderId: "1023873486124",
  appId: "1:1023873486124:web:97ebbd7d929d17d2a8f089",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
