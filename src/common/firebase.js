/* firebase */
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBliuoZQW47Gz4yRaw7t5-S72POX2tY6Eo',
  authDomain: 'dinamicroute.firebaseapp.com',
  databaseURL: 'https://dinamicroute.firebaseio.com',
  projectId: 'dinamicroute',
  storageBucket: 'dinamicroute.appspot.com',
  messagingSenderId: '306663470155',
  appId: '1:306663470155:web:96d9ccc18508dde284c9ce',
};

// console.log({ firebaseConfig });

// firebaseの２重起動抑止
if (firebase.apps.length === 0) {
  // const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
