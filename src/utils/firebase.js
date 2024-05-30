import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBoYFYMaOR6z-E1fHZ3Ou8xKRUC84O8-J0",
    authDomain: "cs-545-71c1d.firebaseapp.com",
    databaseURL: "https://cs-545-71c1d-default-rtdb.firebaseio.com",
    projectId: "cs-545-71c1d",
    storageBucket: "cs-545-71c1d.appspot.com",
    messagingSenderId: "664659226539",
    appId: "1:664659226539:web:a73a21377a49508eeb2cee",
    measurementId: "G-B6HE8TJS10"
});


// Initialize Firebase
const analytics = firebase.analytics();
const messaging = firebase.messaging();
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export default app;
export { messaging, analytics };
