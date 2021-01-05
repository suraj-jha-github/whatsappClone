// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAabx0YNtqaodeKyWal6VMsNQBV8ABYgWw",
    authDomain: "whatsapp-clone-6ac36.firebaseapp.com",
    projectId: "whatsapp-clone-6ac36",
    storageBucket: "whatsapp-clone-6ac36.appspot.com",
    messagingSenderId: "3141083146",
    appId: "1:3141083146:web:532798f9a72fd0f0283ff3",
    measurementId: "G-5ED1943GMJ"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()
  const auth=firebase.auth()
  const provider =new firebase.auth.GoogleAuthProvider()

  export {auth,provider};
  export default db;