import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIrpJj8HkaVGSZ_4NTQltH80F4Pxitn14",
  authDomain: "mafiamaster-c0cfb.firebaseapp.com",
  projectId: "mafiamaster-c0cfb",
  storageBucket: "mafiamaster-c0cfb.appspot.com",
  messagingSenderId: "495500955812",
  appId: "1:495500955812:web:9e6b518936fd575b359631",
  measurementId: "G-MRL8NXEVJ7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
