import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';

import { user } from '@/stores/user';

const firebaseConfig = {
  apiKey: 'AIzaSyBoZFqoN04m6pYOSVnOvHRhEJWxudWdnuQ',
  authDomain: 'kerdo-me.firebaseapp.com',
  databaseURL: 'https://kerdo-me.firebaseio.com',
  projectId: 'kerdo-me',
  storageBucket: 'kerdo-me.appspot.com',
  messagingSenderId: '1083521061515',
  appId: '1:1083521061515:web:0eb2e431e2021904e9ba8e',
  measurementId: 'G-TQYG718587',
};

firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics();
const performance = firebase.performance();

const firestore = firebase.firestore();
// firestore.settings({ host: 'localhost:8080', ssl: false });

const storage = firebase.storage();

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const login = () => {
  analytics.logEvent('login', { name: 'Sisse logimine' });
  auth.signInWithPopup(googleProvider);
};

const logout = () => {
  auth.signOut();
};

auth.onAuthStateChanged(async (_user) => {
  if (_user) {
    const { uid, displayName } = _user;
    const userRecord = await firestore.collection('kasutajad').doc(uid).get();
    const { editor, admin } = userRecord.data() || {
      editor: false,
      admin: false,
    };
    user.set({ uid, displayName, editor, admin });
  } else {
    user.set(null);
  }
});

export {
  storage,
  firestore,
  serverTimestamp,
  analytics,
  performance,
  login,
  logout,
};
