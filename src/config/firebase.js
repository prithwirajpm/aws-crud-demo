
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRH1Rudm6SDi9taOnUImGLAUcQFeshK5U",
  authDomain: "fir-crud-9e2db.firebaseapp.com",
  projectId: "fir-crud-9e2db",
  storageBucket: "fir-crud-9e2db.appspot.com",
  messagingSenderId: "839595615058",
  appId: "1:839595615058:web:e0da8eb69aa72b65f4508b",
  measurementId: "G-CHDF5691XH"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
