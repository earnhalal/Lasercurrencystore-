import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVWzoKpnFnCLkNKBQzebXsEFZfXTkMTpE",
  authDomain: "lasercash-3af82.firebaseapp.com",
  projectId: "lasercash-3af82",
  storageBucket: "lasercash-3af82.firebasestorage.app",
  messagingSenderId: "160223776010",
  appId: "1:160223776010:web:54a03c3dad6df3162e7ef3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
