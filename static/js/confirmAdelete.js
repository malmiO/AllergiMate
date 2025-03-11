import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  deleteUser
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  remove,
  get
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVA7atPi3-3Mw0YLCQWd-T--_v9WP2jJs",
  authDomain: "allergimate-8a19c.firebaseapp.com",
  databaseURL: "https://allergimate-8a19c-default-rtdb.firebaseio.com",
  projectId: "allergimate-8a19c",
  storageBucket: "allergimate-8a19c.firebaseapp.com",
  messagingSenderId: "573083521508",
  appId: "1:573083521508:web:3a9055e91a181cee9e77f1",
  measurementId: "G-ZXDFZ94C24",
};

// ✅ Check if Firebase is already initialized before initializing
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth();
const database = getDatabase(firebaseApp);

// Delete Account Function
document.getElementById("delete-account-btn").addEventListener("click", async () => {
  const confirmation = confirm("Are you sure you want to delete your account?");
  if (!confirmation) return;

  // Ask for user credentials
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  if (!email || !password) {
    alert("Email and password are required!");
    return;
  }

  try {
    // Reauthenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user exists in the database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      alert("User not found in database!");
      return;
    }

    // Delete user from the database
    await remove(userRef);
    
    // Delete authentication account
    await deleteUser(user);

    alert("Your account has been deleted successfully.");
    window.location.href = "/"; // Redirect to loading page
  } catch (error) {
    console.error("Error deleting account:", error);
    alert(`Failed to delete account: ${error.message}`);
  }
});
