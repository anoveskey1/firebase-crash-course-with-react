import React, { useState } from 'react';
import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';


const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type={"password"}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In With Google</button>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Auth;