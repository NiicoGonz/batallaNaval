import firebase from "firebase/compat/app";

//importaciones de firebase
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYFTvlpilm57waWHIyXjNNARsnZgusIKo",
  authDomain: "battleship-ca8e8.firebaseapp.com",
  projectId: "battleship-ca8e8",
  storageBucket: "battleship-ca8e8.appspot.com",
  messagingSenderId: "1096196160641",
  appId: "1:1096196160641:web:282ec82186b970ec0d2180"
};

// validador de conexion
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

// exportar las herramientas de firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseNow = firebase.firestore.FieldValue.serverTimestamp();

export default firebase;
