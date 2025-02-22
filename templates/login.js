import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js";      // paste this


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCzT5d2u0IkWpZfF5FCr4PwKMHPaGrtE0",
  authDomain: "sample-login-33567.firebaseapp.com",
  projectId: "sample-login-33567",
  storageBucket: "sample-login-33567.firebasestorage.app",
  messagingSenderId: "567157020233",
  appId: "1:567157020233:web:ae6593986a25b26e5d1198"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const toggleText = document.getElementById('toggle-text');
  const messageDiv = document.getElementById('message');
  let isLogin = true;
  
  // Function to display inline messages
  function displayMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = "";
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
    // Auto-hide message after 4 seconds
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 4000);
  }
  
  // Toggle between Login and Sign Up
  function toggleMode() {
    isLogin = !isLogin;
    formTitle.innerText = isLogin ? "Login" : "Sign Up";
    submitBtn.innerText = isLogin ? "Login" : "Register";
    toggleText.innerHTML = isLogin 
      ? "Don't have an account? <a id='toggle-link' href='javascript:void(0);'>Sign up</a>"
      : "Already have an account? <a id='toggle-link' href='javascript:void(0);'>Login</a>";
    document.getElementById('toggle-link').addEventListener('click', toggleMode);
  }
  
  document.getElementById('toggle-link').addEventListener('click', toggleMode);
  
  // Handle form submission
  submitBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      displayMessage("Please enter both email and password.", "error");
      return;
    }
    
    if (isLogin) {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          displayMessage("Login successful!", "success");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        })
        .catch((error) => {
          displayMessage(error.message, "error");
        });
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          displayMessage("Registration successful!", "success");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        })
        .catch((error) => {
          displayMessage(error.message, "error");
        });
    }
  });
  
  // Google Sign-In functionality
  const googleBtn = document.getElementById('google-btn');
  googleBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        displayMessage("Google sign-in successful!", "success");
        setTimeout(() => {
          window.location.href = "/index";
        }, 1000);
      })
      .catch((error) => {
        displayMessage(error.message, "error");
      });
  });
  