import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: 'AIzaSyBo72gzSIEcqgaKhHLxzTwUdYeRp5mvqOg',
  authDomain: 'test-task-e8071.firebaseapp.com',
  databaseURL: 'https://test-task-e8071.firebaseio.com',
  projectId: 'test-task-e8071',
  storageBucket: 'test-task-e8071.appspot.com',
  messagingSenderId: '715261530035'
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const paymentsCollection = db.collection('payments');

export {
  db,
  auth,
  currentUser,
  paymentsCollection,
};
