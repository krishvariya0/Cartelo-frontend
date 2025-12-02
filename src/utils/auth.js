import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";

import { auth } from "./firebase";

// ---------------------------
// EMAIL SIGNUP
// ---------------------------
export const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// ---------------------------
// GOOGLE SIGN UP / LOGIN
// ---------------------------
const provider = new GoogleAuthProvider();

// Force Google to always ask which account to use
provider.setCustomParameters({
    prompt: "select_account",
});

export const signUpWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

// ---------------------------
// EMAIL LOGIN
// ---------------------------
export const signInWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// ---------------------------
// RESET PASSWORD
// ---------------------------
export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
};

// ---------------------------
// LOGOUT
// ---------------------------
export const logoutUser = () => {
    return signOut(auth);
};
