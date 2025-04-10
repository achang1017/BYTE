import Constants from 'expo-constants';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getAuth,
    initializeAuth,
    GoogleAuthProvider,
} from 'firebase/auth';

const firebaseKeys = Constants.expoConfig?.extra?.firebase;

const firebaseConfig = {
    apiKey: firebaseKeys.apiKey,
    authDomain: firebaseKeys.authDomain,
    projectId: firebaseKeys.projectId,
    storageBucket: firebaseKeys.storageBucket,
    messagingSenderId: firebaseKeys.messagingSenderId,
    appId: firebaseKeys.appId,
    measurementId: firebaseKeys.measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
