// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfJx2iJYHR9RcWQHGQUp6Xk5ZH2QbZqRs",
  authDomain: "hybrvid-386309.firebaseapp.com",
  projectId: "hybrvid-386309",
  storageBucket: "hybrvid-386309.appspot.com",
  messagingSenderId: "179428024221",
  appId: "1:179428024221:web:df7f408b83e28ca002d974",
  measurementId: "G-XNH7YN60DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;