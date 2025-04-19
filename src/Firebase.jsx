// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "lokseva-6f30a.firebaseapp.com",
  projectId: "lokseva-6f30a",
  storageBucket: "lokseva-6f30a.firebasestorage.app",
  messagingSenderId: "1039875865565",
  appId: "1:1039875865565:web:10d986dda4addf1d839434",
  measurementId: "G-3W8BKJ3MV7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
// Export auth and provider for authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { db };
