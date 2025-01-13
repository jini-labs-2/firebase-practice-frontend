// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1furYoNRIYxBYbSJ-oX4o2bYMlGi40K8",
  authDomain: "fir-test-04-2f5cd.firebaseapp.com",
  projectId: "fir-test-04-2f5cd",
  storageBucket: "fir-test-04-2f5cd.firebasestorage.app",
  messagingSenderId: "496007672046",
  appId: "1:496007672046:web:3180a894ba1570db9683ff",
  measurementId: "G-FXTZW93X4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const emulate = process.env['NODE_ENV'] === 'development' ? true : false;
const emulatorAuthPort = process.env['EMULATOR_AUTH_PORT'] ?? '9099';

console.log(`emulator mode : ${emulate}`)
function _getAuth(): Auth {
  const auth = getAuth();
  if (emulate) connectAuthEmulator(auth, `http://127.0.0.1:${emulatorAuthPort}`);
  return auth;
}

export const fbAuth = _getAuth();
export const fbAnalytics = getAnalytics(app);