import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCWiTuIA_dmWPbp5evJVUYVIy_ch4i8cWc",
    authDomain: "madlibs-clothing.firebaseapp.com",
    databaseURL: "https://madlibs-clothing.firebaseio.com",
    projectId: "madlibs-clothing",
    storageBucket: "madlibs-clothing.appspot.com",
    messagingSenderId: "142489547999",
    appId: "1:142489547999:web:11ba69e4d2cdf3b291a56a",
    measurementId: "G-VKRWZH5ZPF"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
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
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;