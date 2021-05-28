import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyANCvAEHYR2sAh0K9123w5H6S0xuIK7Ecc",
    authDomain: "crown-clothing-db-8f460.firebaseapp.com",
    projectId: "crown-clothing-db-8f460",
    storageBucket: "crown-clothing-db-8f460.appspot.com",
    messagingSenderId: "1048461429392",
    appId: "1:1048461429392:web:0623d6879d4ed49525a615",
    measurementId: "G-EQLD9BM0M5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
  	const { displayName, email } = userAuth;
  	const createdAt = new Date();

  	try {
  	  await userRef.set({
  	  	displayName,
  	  	email,
  	  	createdAt,
  	  	...additionalData
  	  })
  	} catch (error) {
  	  console.log('error creating user', error.message);
  	}
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;