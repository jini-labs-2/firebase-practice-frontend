import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC13yGdR3UEABYWO_U4yHyUni-xGBxfXjY",
  authDomain: "fir-user-manage-66444.firebaseapp.com",
  projectId: "fir-user-manage-66444",
  storageBucket: "fir-user-manage-66444.firebasestorage.app",
  messagingSenderId: "931874853265",
  appId: "1:931874853265:web:80f0e0d0df739edc560a30",
  measurementId: "G-WW7R12PG76"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)
