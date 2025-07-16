import React from 'react';
import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import eye from '../assets/icons/eye.png';
import hidden from '../assets/icons/hidden.png';
import googleIcon from "../assets/icons/google.png";

const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        const trimmedEmail = email.trim().toLocaleLowerCase();
        const trimmedPassword = password.trim();
        e.preventDefault();
        try {
            console.log("Email:", `"${email}"`);
            console.log("Password:", `"${password}"`);
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("creating user");
            navigate("/watchlist");
            console.log("account created");
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log("Loggin in");
                    navigate("/watchlist")
                } catch (loginErr) {
                    setError("Incorrect password.");
                }
            }
            else if ('auth/weak-password') {
                setError("Password should be at least 6 characters.");
            }
            else {
                setError("Create account failed, try again");
                console.error('Create account failed:', err.message)
            }
        }
    }

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/watchlist");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="flex justify-center mt-5">
                <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <form onSubmit={handleEmailLogin}>
                        <h2 className="text-white block mb-3 text-xl font-semibold text-center">Log In</h2>
                        <label className="text-white block mb-1">Email</label>
                        <input
                            className="text-black w-full rounded-sm mb-6 p-1"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@gmail.com"></input>
                        <label className="text-white block mb-1">Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                id="password"
                                placeholder="password"
                                onChange={e => setPassword(e.target.value)}
                                className="text-black w-full rounded-sm p-1"></input>
                            <img
                                src={showPassword ? hidden : eye}
                                alt="Toggle Password Visible"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)} />
                        </div>
                        <label className='text-blue-500 text-sm'>Forgot password?</label>
                        {error && (<p className='text-red-500 text-sm text-center mt-2'>{error}</p>)}
                        <input type="submit" value="Log In" className="bg-red-600 hover:bg-red-700 p-1.5 font-semibold rounded-lg cursor-pointer tracking-wider mx-auto block mt-4" />
                    </form>
                    <button
                        onClick={signInGoogle}
                        className="mt-5 w-full flex items-center justify-center gap-2 border border-zinc-600 bg-white hover:bg-zinc-100 text-black font-medium py-2 px-4 rounded transition"
                    >
                        <img src={googleIcon} alt="Google" className="h-5 w-5" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </>

    );
}

export default LoginForm