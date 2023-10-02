import {initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {connectStorageEmulator, getStorage} from 'firebase/storage'
import {connectFunctionsEmulator, getFunctions } from "firebase/functions"


const firebaseConfig = {
  apiKey: "AIzaSyBp5jfEAW_oT8IpiW_QesRFggNON_iYpbk",
  authDomain: "picfolks.firebaseapp.com",
  projectId: "picfolks",
  storageBucket: "picfolks.appspot.com",
  messagingSenderId: "974483956213",
  appId: "1:974483956213:web:294e3bc79b868c6620c0bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
export const storage = getStorage(app)
export const auth = getAuth(app);

//connecting emulator

if (import.meta.env.DEV) {

  connectStorageEmulator(storage, "localhost", 9199)
  connectFunctionsEmulator(functions, "localhost", 5001)

}