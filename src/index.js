import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC4HdUtU2emnN1Sudme9GGK6bXZpybKIwE",
    authDomain: "debtsapp1.firebaseapp.com",
    databaseURL: "https://debtsapp1.firebaseio.com",
    projectId: "debtsapp1",
    storageBucket: "debtsapp1.appspot.com",
    messagingSenderId: "1009620162054",
    appId: "1:1009620162054:web:3b0a4fcf098c2c40"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export const db = firebase.firestore();
  