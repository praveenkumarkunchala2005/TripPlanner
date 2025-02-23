// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMZWc3HsIX67pzP_gvF_P7zMfa91gFf7k",
  authDomain: "ai-travelplanner-3f6ba.firebaseapp.com",
  projectId: "ai-travelplanner-3f6ba",
  storageBucket: "ai-travelplanner-3f6ba.firebasestorage.app",
  messagingSenderId: "857736455960",
  appId: "1:857736455960:web:9fc8a6e49f69a39f56a06d",
  measurementId: "G-47HNV9TTNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
