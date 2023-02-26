import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "docxter-cf329.firebaseapp.com",
  projectId: "docxter-cf329",
  storageBucket: "docxter-cf329.appspot.com",
  messagingSenderId: "292828390537",
  appId: process.env.NEXT_FIREBASE_APP_ID,
  measurementId: "G-6GXNQDEBYM",
};

const app = initializeApp(firebaseConfig);

export const dbFireStore = getFirestore(app);
export const storage = getStorage(app);

export const userCollectionRef = collection(dbFireStore, "users");
export const documentCollectionRef = collection(dbFireStore, "document");

export const auth = getAuth(app);
