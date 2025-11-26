// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // <-- Add this import for Realtime Database
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsa-O4v4pxm2dAY0CspRYRPjv9j8hYrXs",
    authDomain: "cartelo-18abc.firebaseapp.com",
    projectId: "cartelo-18abc",
    storageBucket: "cartelo-18abc.firebasestorage.app",
    messagingSenderId: "860220833680",
    appId: "1:860220833680:web:cce5ba1a266bf28618fd15",
    measurementId: "G-MB94K5R9NJ",
    // You already have a databaseURL in your project facts for the default RTDB:
    databaseURL: "https://cartelo-18abc-default-rtdb.firebaseio.com" // <-- It's good practice to include this, though it might be inferred.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // For Cloud Firestore
export const storage = getStorage(app);
export const rtdb = getDatabase(app); // <-- Add this for Realtime Database

export default app;
