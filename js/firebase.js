
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDeMd4TTqUTuaz18jPdP3Xcot8JcA-yA3E",
    authDomain: "auth-project-first.firebaseapp.com",
    projectId: "auth-project-first",
    storageBucket: "auth-project-first.appspot.com",
    messagingSenderId: "108660785999",
    appId: "1:108660785999:web:d4b91075bffc60fd403b3a"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)