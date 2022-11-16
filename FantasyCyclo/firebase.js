import firebase from "firebase"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyC7NxfGZmDbY8RnvfdDg-zCpJFKH6lP4Dc",
    authDomain: "fantasycyclo.firebaseapp.com",
    projectId: "fantasycyclo",
    storageBucket: "fantasycyclo.appspot.com",
    messagingSenderId: "841167855160",
    appId: "1:841167855160:web:edf25f87666498ba0750cd",
    measurementId: "G-FHS44XB7SB"
};

let app


if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

export const f = firebase
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()



