import firebase from "firebase/compat/app";
import  'firebase/compat/auth';
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyC8FeeKK_ISIcOZ-mgWSnaRXXeuGu5Lv0k",
    authDomain: "clone-app-43957.firebaseapp.com",
    projectId: "clone-app-43957",
    storageBucket: "clone-app-43957.appspot.com",
    messagingSenderId: "987780295456",
    appId: "1:987780295456:web:252b7cfec5a9786a32c545",
    measurementId: "G-LD49P607T0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db,auth};