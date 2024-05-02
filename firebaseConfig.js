import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4TtAYYF-49CItk2IwZhTiPPRTrXceYO4",
  authDomain: "test-project-74812.firebaseapp.com",
  projectId: "test-project-74812",
  storageBucket: "test-project-74812.appspot.com",
  messagingSenderId: "157341022080",
  appId: "1:157341022080:web:3476fc86cd318a287f7365",
  measurementId: "G-S8FZ4N5LNY",
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const app = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(app);

export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
