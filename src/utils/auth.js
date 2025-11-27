import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "./firebase";

export const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const logoutUser = () => {
    return signOut(auth);
};
