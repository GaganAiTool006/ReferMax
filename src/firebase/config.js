import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using Vite environment variables or fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForStandaloneDemoApp98234",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "stepx-footwear.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "stepx-footwear",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "stepx-footwear.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475612",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475612:web:98f8e7d6c5b4a3"
};

let app;
let auth;
let db;
let googleProvider;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn("Firebase initialized in standalone local mode:", error.message);
}

export { app, auth, db, googleProvider };
