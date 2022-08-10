import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCyIpOz7raGNBfQcEk9gpMzFY5J8tESD0o",
  authDomain: "trailerama-c7c90.firebaseapp.com",
  projectId: "trailerama-c7c90",
  storageBucket: "trailerama-c7c90.appspot.com",
  messagingSenderId: "305670494553",
  appId: "1:305670494553:web:255b64b5f903a05af39448",
  measurementId: "G-0PSW2VZWNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);