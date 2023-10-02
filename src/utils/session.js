import { auth } from "./firebaseconf";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "firebase/auth";

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const userSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const userSignOut = () => signOut(auth)