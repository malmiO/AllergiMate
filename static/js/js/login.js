import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', function () {

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
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const database = getDatabase(app);

  // DOM Elements
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginButton = document.getElementById('login-btn');

  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirmPassword = document.getElementById('signup-confirm-password');
  const confirmButton = document.getElementById('Confirm-btn');

  const loginMessageElement = document.getElementById('login-message');
  const signupMessageElement = document.getElementById('signup-message');

  function displayMessage(message, type, formType) {
    const messageElement = formType === 'login' ? loginMessageElement : signupMessageElement;

    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = `message ${type}`; // 'error' or 'success'
    } else {
      console.error('Message element not found');
    }
  }

  // Login Function
  loginButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      displayMessage(`Welcome back, ${user.email}`, 'success', 'login');

      // Redirect to profile.html or another secure page
      window.location.href = "/home";
    } catch (error) {
      displayMessage(`Login failed: ${error.message}`, 'error', 'login');
    }
  });

  // Signup Function
  confirmButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    const name = signupName.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    if (password !== confirmPassword) {
      displayMessage('Passwords do not match. Please try again.', 'error', 'signup');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        name: name,
        email: email,
        allergies: [] // Initialize allergies array
      });

      displayMessage(`Account created for ${user.email}. Redirecting to allergies page...`, 'success', 'signup');

      // Redirect to allergies.html after successful signup
      window.location.href = "/allergies";
    } catch (error) {
      displayMessage(`Signup failed: ${error.message}`, 'error', 'signup');
    }
  });

  // Optional: Monitor authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(`User logged in: ${user.email}`);
    } else {
      console.log('No user is logged in.');
    }
  });

});
