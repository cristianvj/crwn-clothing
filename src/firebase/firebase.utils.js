import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyAap-rhuUYhboJmPB6Tk1jFzHoI8cvEi88",
  authDomain: "crwn-db-7cf83.firebaseapp.com",
  projectId: "crwn-db-7cf83",
  storageBucket: "crwn-db-7cf83.appspot.com",
  messagingSenderId: "393523919324",
  appId: "1:393523919324:web:501cf9d8e8bf8311bcb719",
  measurementId: "G-FMWH374TRT"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase