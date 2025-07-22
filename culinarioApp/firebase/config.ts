import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyCmRpBspsdnqbbgP30i2GV99y3d4rdrdbo",
  authDomain: "culinariorecipeapp.firebaseapp.com",
  projectId: "culinariorecipeapp",
  storageBucket: "culinariorecipeapp.firebasestorage.app",
  messagingSenderId: "1048920261192",
  appId: "1:1048920261192:web:ed3a053bf60523b8878e7d",
  measurementId: "G-PELJH97HJT"
};

let firebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export const db = getFirestore(firebaseApp);
export default firebaseApp;
