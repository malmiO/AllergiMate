// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVA7atPi3-3Mw0YLCQWd-T--_v9WP2jJs",
  authDomain: "allergimate-8a19c.firebaseapp.com",
  databaseURL: "https://allergimate-8a19c-default-rtdb.firebaseio.com",
  projectId: "allergimate-8a19c",
  storageBucket: "allergimate-8a19c.firebasestorage.app",
  messagingSenderId: "573083521508",
  appId: "1:573083521508:web:3a9055e91a181cee9e77f1",
  measurementId: "G-ZXDFZ94C24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import Firebase Authentication module
import { getAuth } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth();

// Get the current user
const user = auth.currentUser;

// Check if a user is signed in
if (user) {
// Retrieve the user's display name
const displayName = user.displayName;
console.log("User's name: ", displayName);
} else {
console.log("No user is signed in.");
}