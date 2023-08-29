import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';

export const LoginAPI = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("user=" + user);
                toast.success("User signed in successfully!")
                resolve(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " with error code " + errorCode);
                toast.error("Error while signing in!");
                reject(error);
            });
    });
}

export const RegisterAPI = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("User registered successfully!")
                resolve(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " with error code " + errorCode);
                toast.error("Error while registering!");
                reject(error);
            });
    });
}


export const GoogleAPI = () => {
    return new Promise((resolve, reject) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success("User signed in successfully!");
                resolve(true);
            })
            .catch((error) => {
                toast.error("Error while signing in!");
                reject(error);
            });
    });
};
