import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyaAuRfn_UKVBnpldBdWNX4NGLwoNPo40",
  authDomain: "deadline-guardian-ai-13d93.firebaseapp.com",
  projectId: "deadline-guardian-ai-13d93",
  storageBucket: "deadline-guardian-ai-13d93.firebasestorage.app",
  messagingSenderId: "1051016065577",
  appId: "1:1051016065577:web:8594dad74c84552fb42238",
  measurementId: "G-LMGR99GY98"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;