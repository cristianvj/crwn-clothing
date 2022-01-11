import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from  'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const config = {
  apiKey: "AIzaSyAap-rhuUYhboJmPB6Tk1jFzHoI8cvEi88",
  authDomain: "crwn-db-7cf83.firebaseapp.com",
  projectId: "crwn-db-7cf83",
  storageBucket: "crwn-db-7cf83.appspot.com",
  messagingSenderId: "393523919324",
  appId: "1:393523919324:web:501cf9d8e8bf8311bcb719",
  measurementId: "G-FMWH374TRT"
};

const app = initializeApp(config)  

export const createUserProfileDocument = async (userAuth, additionaldata) => {
  if(!userAuth) return
  //const userRef = app.doc(`users/${userAuth.uid}`)
  const userRef = doc(firestore, "users", userAuth.uid);
  
  //const snapShot = await userRef.get()
  const snapShot = await getDoc(userRef);

  if(!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()
    
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionaldata
      })
    } catch (error) {
      console.log(`Error creating user: ${error.message}`)
    }
  }

  return snapShot
}

export const auth = getAuth(app)
export const firestore = getFirestore(app)

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const { user } = result;
  return user
  // ...
}).catch((error) => {
  const credential = GoogleAuthProvider.credentialFromError(error);
  return credential
  // ...
});

export default app