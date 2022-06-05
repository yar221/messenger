import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA__50Zy0oMqH5BC7ZZmHU4a0cusH_VmSo",
    authDomain: "messenger2-fcb59.firebaseapp.com",
    databaseURL: "https://messenger2-fcb59-default-rtdb.firebaseio.com",
    projectId: "messenger2-fcb59",
    storageBucket: "messenger2-fcb59.appspot.com",
    messagingSenderId: "521235042488",
    appId: "1:521235042488:web:5c54790513cc7586f7a44d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    app,
    db
}