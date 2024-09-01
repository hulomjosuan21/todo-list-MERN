import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_API_KEY,
  authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.REACT_APP_DB_URL,
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MSG_SENDER_ID,
  appId: import.meta.env.REACT_APP_APP_ID,
  measurementId: import.meta.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export default app;