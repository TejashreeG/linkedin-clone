import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA5QgsHveL98Lxgozw43WjZ9pKnUM4EXVM",
    authDomain: "linkedin-clone-731b7.firebaseapp.com",
    projectId: "linkedin-clone-731b7",
    storageBucket: "linkedin-clone-731b7.appspot.com",
    messagingSenderId: "868854804194",
    appId: "1:868854804194:web:81eb0d387ac7acf60db8bb"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};
  