import firebase from 'firebase';
import 'firebase/firestore';
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
};

export default Firebase;
