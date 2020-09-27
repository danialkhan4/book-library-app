import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyCbb11Pr-rx9Sk6oFW95_eP8LmZpxEdJEM",
    authDomain: "book-library-app-8eb19.firebaseapp.com",
    databaseURL: "https://book-library-app-8eb19.firebaseio.com",
    projectId: "book-library-app-8eb19",
    storageBucket: "book-library-app-8eb19.appspot.com",
    messagingSenderId: "553206836295",
    appId: "1:553206836295:web:ca4ff0892ff6fd281b1562",
    measurementId: "G-KFFN83VGEQ"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

