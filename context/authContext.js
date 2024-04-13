import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";

import {doc,getDoc,setDoc} from 'firebase/firestore';
import { db } from "../firebaseConfig";
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        //on auth state change
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        })

        return unsub
    },[])

    const updateUserData= async (userId) =>{
        const docRef = doc(db,'users',userId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user,username:data.username,profileUrl:data.profileUrl,userId:data.userId});
        }
    }

    async function login (email,password) {
        try {
            await signInWithEmailAndPassword(auth,email,password)
            return {success:true}
        } catch (e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-credential)')) msg = "Incorrect Email or Password"
            return {success:false,msg}
        }
    }

    async function logout (email,password) {
        try {
            await signOut(auth)
            return {success:true}
        } catch (e) {
            return {success:false,msg:e.message}
        }
        
    }
    async function register (email,password,username,profileUrl) {
        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);

            await setDoc(doc(db,'users',response?.user?.uid),{
                username,
                profileUrl,
                userId:response?.user?.uid
            })

            return {success:true,data:response?.user}
        } catch (err) {
            let msg = err.message;
            if(msg.includes('(auth/invalid-email)')) msg = "Invalid email!"
            if(msg.includes('(auth/email-already-in-use)')) msg = "Email already in use"
            return {success:false,msg};
        }
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    );



}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value) throw new Error('useAuth() must be wrapped inside AuthContextProvider');

    return value;
}