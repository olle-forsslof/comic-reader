// const firebase = require("firebase/app");
// require("firebase/firestore");
import firebase from 'firebase/app'
import 'firebase/firestore'
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
firebase.initializeApp({apiKey: process.env.API_KEY, authDomain: process.env.AUTH_DOMAIN, projectId: process.env.PROJECT_ID, storageBucket: process.env.STORAGE_BUCKET});

const db = firebase.firestore();
const storage = firebase.storage();

// module.exports = {
// db,
// storage
// }
export {
  db,
  storage
}

