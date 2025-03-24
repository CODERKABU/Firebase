// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1y3Fw5qY0dquPZkcPi2irr8H9l29ercs",
  authDomain: "fir-00-9eb1b.firebaseapp.com",
  projectId: "fir-00-9eb1b",
  storageBucket: "fir-00-9eb1b.firebasestorage.app",
  messagingSenderId: "915790444088",
  appId: "1:915790444088:web:d049e45ae9f90dc2f698cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);