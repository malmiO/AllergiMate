import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
//import { initializeApp } from "firebase/app";

// Firebase configuration
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
const auth = getAuth();
const database = getDatabase(app);

// DOM Elements
const finishButton = document.getElementById("finish-button");
const allergiesDataInput = document.getElementById("allergies-data");

// Event Listener for Finish Button
finishButton.addEventListener("click", async () => {
    const allergies = allergiesDataInput.value; // Fetch allergies data from hidden input

    if (!allergies) {
        alert("Please enter your allergies data.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Update allergies in Realtime Database
                const userRef = ref(database, `users/${user.uid}`);
                await update(userRef, { allergies: JSON.parse(allergies) });

                alert("Your allergies data has been saved.");
                auth.signOut(); // Log out the user
                window.location.href = "/login"; // Redirect to login.html
            } catch (error) {
                console.error("Error updating allergies data: ", error);
                alert("Error saving your data. Please try again later.");
            }
        } else {
           console.log("No user is logged in.");
        }
    });
});
