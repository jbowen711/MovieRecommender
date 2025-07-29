import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKBCvoEpIXVRFryfBojFmq2SJfNr3r62M",
  authDomain: "sceneit-8740e.firebaseapp.com",
  projectId: "sceneit-8740e",
  storageBucket: "sceneit-8740e.firebasestorage.app",
  messagingSenderId: "142179986395",
  appId: "1:142179986395:web:7666ceb18fd387f91095fe",
  measurementId: "G-956H69LZF7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
const analytics = getAnalytics(app);