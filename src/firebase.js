import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAIxLB92jiHECMPSYfS-jHZYZD8omNGcYA",
  authDomain: "disneyplus-clone-8f6c3.firebaseapp.com",
  projectId: "disneyplus-clone-8f6c3",
  storageBucket: "disneyplus-clone-8f6c3.appspot.com",
  messagingSenderId: "510934825262",
  appId: "1:510934825262:web:1da2bec64ca205c65de2bf",
  measurementId: "G-6YFDTHH94N"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, provider, storage, db };