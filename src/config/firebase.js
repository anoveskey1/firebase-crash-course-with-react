import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { localConfigs } from "../localConfigs.js";

// Remove secret before pushing back up to repo.
const firebase = {
    apiKey: localConfigs?.apiKey,
    authDomain: "fir-crash-course-w-react.firebaseapp.com",
    projectId: "fir-crash-course-w-react",
    storageBucket: "fir-crash-course-w-react.firebasestorage.app",
    messagingSenderId: localConfigs?.messagingSenderId,
    appId: localConfigs?.appId,
    measurementId: localConfigs?.measurementId
};

const app = initializeApp(firebase);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);