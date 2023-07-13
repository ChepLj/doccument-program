// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { SY_SCR_FB } from './variable';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
   apiKey: SY_SCR_FB[0],
   authDomain: "document-program.firebaseapp.com",
   databaseURL: "https://document-program-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "document-program",
   storageBucket: "document-program.appspot.com",
   messagingSenderId: "371224254320",
   appId: SY_SCR_FB[1],
   measurementId: "G-6VNM2PEL3R",
   databaseURL: 'https://document-program-default-rtdb.asia-southeast1.firebasedatabase.app',
 
 };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGG = new GoogleAuthProvider()
// const analytics = getAnalytics(app);
 const storage = getStorage(app);
 const database = getDatabase(app);
export { auth, database, providerGG, storage };

