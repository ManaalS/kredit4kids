// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import axios from "axios";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// }

const firebaseConfig = {
    apiKey: "AIzaSyCSRigYRYNq2t1Poafz95TskxiOPr0-BqQ",
    authDomain: "kredible-b955d.firebaseapp.com",
    projectId: "kredible-b955d",
    storageBucket: "kredible-b955d.appspot.com",
    messagingSenderId: "550602858878",
    appId: "1:550602858878:web:9e86f53ca34a874630532f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }

// export const auth = firebase.auth();


// axios.interceptors.request.use(async config => {
//     // all outgoing axios requests now automatically have the JWT token identifying the logged in user added to headers.authorization
//     // this means that the server can automatically verify requests which need users to be logged in
//     if (auth.currentUser && config.headers) {
//         config.headers.authorization = "Bearer " + (await auth.currentUser.getIdToken());
//     }
//     return config;
// });

// export default firebase