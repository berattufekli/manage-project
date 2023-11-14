// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyABFHDyAKpuQMOtTnHWtJn_bkLlGScdkbM",
  authDomain: "projectmanagement-8d431.firebaseapp.com",
  projectId: "projectmanagement-8d431",
  storageBucket: "projectmanagement-8d431.appspot.com",
  messagingSenderId: "242268708957",
  appId: "1:242268708957:web:aadb3f24ccfe8fe55c6db4",
  measurementId: "G-8R1P4EH2LG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 
const storage = getStorage(app);

export { auth, db, storage, firebaseConfig }; 