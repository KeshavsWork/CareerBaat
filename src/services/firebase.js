// client/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK-Q6ooTQkWxJ58DrsHMmlgpsH6M-kbvk",
  authDomain: "careerbaat.firebaseapp.com",
  projectId: "careerbaat",
  storageBucket: "careerbaat.firebasestorage.app",
  messagingSenderId: "456045296303",
  appId: "1:456045296303:web:0a0e687af8638d7057f25a",
  measurementId: "G-GRQ5JNQ1SP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
