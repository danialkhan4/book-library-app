import firebase from 'firebase/app';
import {authData} from './key';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(authData);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

