// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth,getReactNativePersistence } from 'firebase/auth'

import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore,collection} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiXKUJ7lvsTjWsNy467E88AR2FX74_2FI",
  authDomain: "potatom-2924c.firebaseapp.com",
  projectId: "potatom-2924c",
  storageBucket: "potatom-2924c.appspot.com",
  messagingSenderId: "470186654319",
  appId: "1:470186654319:web:0b770c603d963f8f3a2b9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app);

export const usersRef = collection(db,'users');
export const roomRef = collection(db,'rooms');