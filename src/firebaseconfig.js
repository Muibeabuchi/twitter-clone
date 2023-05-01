// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "chiki-twitter.firebaseapp.com",
  projectId: "chiki-twitter",
  storageBucket: "chiki-twitter.appspot.com",
  messagingSenderId: "770343327736",
  appId: "1:770343327736:web:4a1a209d09bb44873d680d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,db,storage
}
// const auth = getAuth(app)