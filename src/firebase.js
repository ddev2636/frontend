import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa24n_K1E8gxreP-VYOtYyOdrefzPjrBc",
  authDomain: "travel-blog-79936.firebaseapp.com",
  projectId: "travel-blog-79936",
  storageBucket: "travel-blog-79936.appspot.com",
  messagingSenderId: "593539919828",
  appId: "1:593539919828:web:ef046b7b410d69a7267041",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
