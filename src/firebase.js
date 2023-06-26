// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaWATYjUB9zgLLkTscXQdRv97mPmBHPjg",
  authDomain: "hybrvid-79747.firebaseapp.com",
  projectId: "hybrvid-79747",
  storageBucket: "hybrvid-79747.appspot.com",
  messagingSenderId: "949024559580",
  appId: "1:949024559580:web:54d92f529799cc9e303f19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;