import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyB3OJSJBtQSerPZ1_KOi8R_b5ztaQhCP6c",
    authDomain: "meawpos.firebaseapp.com",
    projectId: "meawpos",
    storageBucket: "meawpos.appspot.com",
    messagingSenderId: "360116624639",
    appId: "1:360116624639:web:f613c5395f29f0d50740ca",
    measurementId: "G-KSCNSNK97C"
});

const db = firebase.firestore();

export default db