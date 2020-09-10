import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDN0AaAyRA3UqhJr6oWekZxXmyoCJlwEtA",
  authDomain: "commerce-44032.firebaseapp.com",
  databaseURL: "https://commerce-44032.firebaseio.com",
  projectId: "commerce-44032",
  storageBucket: "commerce-44032.appspot.com",
  messagingSenderId: "1006203374195",
  appId: "1:1006203374195:web:680baeb9033607aa707806",
  measurementId: "G-Y34ZQYZ8N7",
};
//https://console.firebase.google.com/project/commerce-44032/overview

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.nessage);
    }
  }

  console.log(snapShot);
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
