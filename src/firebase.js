import * as firebase from 'firebase';
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDWvxR0U5rHrBboJDRjakgDtZqS0xbIvRo",
    authDomain: "react-crud-91fe0.firebaseapp.com",
    databaseURL: "https://react-crud-91fe0.firebaseio.com",
    projectId: "react-crud-91fe0",
    storageBucket: "react-crud-91fe0.appspot.com",
    messagingSenderId: "506455043826",
    appId: "1:506455043826:web:a7907a99e969bdd6b3aa6b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;