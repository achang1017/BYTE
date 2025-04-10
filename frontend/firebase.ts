import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getAuth,
    initializeAuth,
    GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_HBGe_WrFs0-itO7VzsH8wtr1TcJUVFs",
    authDomain: "byte-84b98.firebaseapp.com",
    databaseURL: "https://byte-84b98-default-rtdb.firebaseio.com",
    projectId: "byte-84b98",
    storageBucket: "byte-84b98.firebasestorage.app",
    messagingSenderId: "541657116895",
    appId: "1:541657116895:web:4a9e371e7956817cb8796a",
    measurementId: "G-WPPM92TJGT"

};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
