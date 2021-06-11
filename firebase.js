import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBHXLjBYRr3Q3bVsVpkROpRsvn1O2kbbDM",
    authDomain: "next-whatsapp-clone-by-rex.firebaseapp.com",
    projectId: "next-whatsapp-clone-by-rex",
    storageBucket: "next-whatsapp-clone-by-rex.appspot.com",
    messagingSenderId: "154763986160",
    appId: "1:154763986160:web:99830bfb78058f10396e35"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider}