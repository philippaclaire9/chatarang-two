import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import config from '../firebase_config';

firebase.initializeApp(config);
// const db = firebase.firestore();

const Firebase = {
  getShoppingRef: () => {
    return firebaseApp.database().ref('shopping');
  },
  getDbRef: () => {
    return firebase.firestore();
  },
  getAuth: () => {
    return firebase.auth();
  },
  getAuthProvider: () => {
    console.log('getting auth provider...');
    return new firebase.auth.EmailAuthProvider();
  },
};

export default Firebase;
