import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAMZRiB0xDxfJitPLnRQi8mDLnzBzj5oC4',
  authDomain: 'tally-log--live.firebaseapp.com',
  databaseURL: 'https://tally-log--live.east4.firebasedatabase.app',
  projectId: 'tally-log--live',
  storageBucket: 'tally-log--live.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:895186639982:ios:29056c18514424b1521a7f',
  measurementId: 'G-4D2VJL5FWB',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase };
