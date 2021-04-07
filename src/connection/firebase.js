import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC-schcWs6H37M6u8uiNDZpmvyL1J5RuPE',
  authDomain: 'soundnet-db.firebaseapp.com',
  projectId: 'soundnet-db',
  storageBucket: 'soundnet-db.appspot.com',
  messagingSenderId: '1073457778580',
  appId: '1:1073457778580:web:b34ecf07d6b16f961dc981',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
