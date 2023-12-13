// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.extra.apiKey,
  authDomain: Constants.extra.authDomain,
  projectId: Constants.extra.projectId,
  storageBucket: Constants.extra.storageBucket,
  messagingSenderId: Constants.extra.messagingSenderId,
  appId: Constants.extra.appId,
  measurementId: "G-2MK6TZB26Q"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore();
export const auth = getAuth();