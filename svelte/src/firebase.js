import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';

const firebaseConfig = {
  apiKey: 'AIzaSyCtj5VpV1XKY_GlhaHj8A05fWx6bgfyPHo',
  authDomain: 'kerdo-news.firebaseapp.com',
  databaseURL: 'https://kerdo-news.firebaseio.com',
  projectId: 'kerdo-news',
  storageBucket: 'kerdo-news.appspot.com',
  messagingSenderId: '1014467941405',
  appId: '1:1014467941405:web:6a88fe8eaa483561f722f4',
  measurementId: 'G-CD5YLTD231',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
// firestore.settings({ host: 'localhost:8080', ssl: false });

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const analytics = firebase.analytics();
const performance = firebase.performance();

export {
  firestore,
  serverTimestamp,
  auth,
  googleProvider,
  analytics,
  performance,
};
