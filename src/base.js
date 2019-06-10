import Rebase from 're-base';
import firebase from 'firebase';

// Firebase Config
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAc1msconuE9GAmCc9inRc4iih8SNL7cmw",
    authDomain: "idm364-40174.firebaseapp.com",
    databaseURL: "https://idm364-40174.firebaseio.com",
    projectId: "idm364-40174",
    storageBucket: "idm364-40174.appspot.com",
    messagingSenderId: "783719103821",
    appId: "1:783719103821:web:e4fddaf487c532d3"
  });

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;