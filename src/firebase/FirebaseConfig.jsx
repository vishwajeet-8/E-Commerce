// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAyO7ReADJrvghnb2PjVsOmskl5MzOIfs0",
  authDomain: "e-commerce-57c3c.firebaseapp.com",
  projectId: "e-commerce-57c3c",
  storageBucket: "e-commerce-57c3c.appspot.com",
  messagingSenderId: "358649436318",
  appId: "1:358649436318:web:8fc59e0b041af0db21038f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};