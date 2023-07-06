import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTba5JrPo8pJlPCjsuWKNal05obR6FjIk",
  authDomain: "todolist-454de.firebaseapp.com",
  projectId: "todolist-454de",
  storageBucket: "todolist-454de.appspot.com",
  messagingSenderId: "142171324142",
  appId: "1:142171324142:web:d98be9585cacdfdc253dff",
  measurementId: "G-YHK3VCYT0E"
};

const app = initializeApp(firebaseConfig);
export default getFirestore();