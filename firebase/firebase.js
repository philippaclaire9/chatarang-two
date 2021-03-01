import firebase from 'firebase';
import config from '../config';

const firebaseApp = firebase.initializeApp(config);

const Firebase = {
  getShoppingRef: () => {
    return firebaseApp.database().ref('shopping');
  },
};

export default Firebase;
