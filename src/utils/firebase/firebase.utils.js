import {initializeApp} from "firebase/app";

// dobbiamo inizializzare l'app firebase
// ed indicare a quale istanza del nostro account firebase ci stiamo riferendo

//Auth Functionalities
import {
    getAuth,
    // signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

//FIRESTORE SETUP
import {
    getFirestore, //per istanziare FireSTORE
    doc, //per recuperare i DOCUMENTI dentro il nostro FIRESTORE DB (db, collection, id)
    getDoc, // per recuperare i dati DAL DOCUMENTO
    setDoc  //per scrivere dati SUL DOCUMENTO
} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyB6bzD8SeJTynPr3gZAjAF2RRMOM7HiFxs",  
    authDomain: "clothing-store-db-cf372.firebaseapp.com",  
    projectId: "clothing-store-db-cf372", //FireBase instance ID  
    storageBucket: "clothing-store-db-cf372.appspot.com",  
    messagingSenderId: "1057609647840",  
    appId: "1:1057609647840:web:7a2ffc99b6cf3b8133b285"
  
};  
  
// // Initialize Firebase  
const firebaseApp = initializeApp(firebaseConfig);

//provider sett
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account" // ogni volta che facciamo un accesso 
  //vogliamo forzare l'utente a selezionare un account
})

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = async () => await signInWithPopup(auth, googleProvider);
//potrebbero esserci più tipi di provider per le differenti modalita di signIn
//auth invece è unico, si fa in un solo modo.

//creaiamo il db
export const db = getFirestore(); // è come avere il Context del DB
//   ora possiamo usare questo context ovunque nel codice. Punta direttamente al DB nell console di FireBase

//ora possiamo creare methods personalizzati per interagire con il db
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {} ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid) //per pescare il documento specifico
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()); //false se è un nuovo user

    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          //i param sopra potrebbero essere passati a questa funzione come no.
          //con le info aggiuntive ci assicuriamo che se un param è null lo andiamo a 
          //sovrascrivere noi con quello preso dal form
          ...additionalInfo
        })
      } catch (error) {
        console.log("error creating the user", error.message)
      }
    }

    return userDocRef;
}


//interface per creare un nuovo utente con email e password, native provider, no third part provider as google or fb
export const createAuthUserWiithEmalAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

//interface per log-in con email e password
export const signInUserWiithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

//essendo che stiamo utilizzando una funzione nostra personalizzata, la callbak dobbiamo
//passerchiela a onAuthStateChange quando invochimao la nostra funzione
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);