import { initializeApp } from 'firebase/app'

import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updatePassword, sendPasswordResetEmail, deleteUser, 
    sendEmailVerification, signOut, onAuthStateChanged,
} from 'firebase/auth'

import { 
    child, get,getDatabase, onValue, ref, remove, set, push, update,
    serverTimestamp,
} from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
}

initializeApp(firebaseConfig)

const useFirebaseAuth = () => {
    const auth = getAuth()
    
    const createUser = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password)

    const logIn = (email, password) => 
    signInWithEmailAndPassword(auth, email, password)

    const logOut = () => signOut(auth)
    
    const pwordUpdate = password => updatePassword(auth.currentUser,password)
    
    const resetPassword = email => sendPasswordResetEmail(auth,email)
    
    const removeUser = () => deleteUser(auth.currentUser)

    const verifyEmail = () => sendEmailVerification(auth.currentUser)

    const onAuthUserListener = (next, fallback) => 
    onAuthStateChanged( auth, authUser => {
        const dbRef = ref(getDatabase())
        
        authUser ? (
            get(child(dbRef, `users/${authUser.uid}`))
            .then(snapshot => {
                const dbUser = snapshot.val()

                if(!dbUser.roles) dbUser.roles = {}
    
                authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    providerData: authUser.providerData,
                    ...dbUser,
                }

                next(authUser)
            })
        ) : fallback() 
    })

    return {
        createUser, logIn, logOut, pwordUpdate, resetPassword,
        removeUser, verifyEmail, onAuthUserListener, getAuth, 
    }
}

const useFirebaseDb = () => {
    const db = getDatabase()
    
    const entity = (uid,name) => ref(db,`${name}/${uid}`)

    const entities = name => ref(db, name)

    return {  
        entity, entities,  onValue,  remove, set, push, update,
        serverTimestamp,
    }
}

const useFirebase = () => {
    const firebaseAuth = useFirebaseAuth()
    
    const firebaseDb = useFirebaseDb()

    return {...firebaseAuth, ...firebaseDb } 
}

export default useFirebase