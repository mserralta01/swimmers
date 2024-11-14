import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNPGHRGHNDXr_BF3lGzKjqb6vAI4xYels",
  authDomain: "swimmers-c0c0e.firebaseapp.com",
  projectId: "swimmers-c0c0e",
  storageBucket: "swimmers-c0c0e.appspot.com",
  messagingSenderId: "1048311932765",
  appId: "1:1048311932765:web:c0c0e0b5b5b5b5b5b5b5b5"
};

console.log('Initializing Firebase with config:', firebaseConfig);
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

export const auth = getAuth(app);
console.log('Auth initialized:', auth);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
console.log('Google provider initialized:', googleProvider);

export const db = getFirestore(app);
