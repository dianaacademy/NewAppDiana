import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBMgD92jWYxvkeSYkElx7DkCqh3a3OlK30",
  authDomain: "ddlp-456ce.firebaseapp.com",
  projectId: "ddlp-456ce",
  storageBucket: "ddlp-456ce.appspot.com",
  messagingSenderId: "133537517881",
  appId: "1:133537517881:web:7f41d03e7deed4c0ed98e8",
  measurementId: "G-VXJGENCYD1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

export default app;