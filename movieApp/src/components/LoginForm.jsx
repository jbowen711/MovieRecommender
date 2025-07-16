import React from 'react';
import { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import eye from '../assets/icons/eye.png';
import hidden from '../assets/icons/hidden.png';

const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("account created")
        } catch (err){
            console.log(err)
        }

    }

    const handleSubmit = () => {
        signIn();
    };

    return (
        <>
            <div className="flex justify-center bg-zinc-950 mt-5">
                <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
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
                    onClick={() => setShowPassword((prev) => !prev)}/>
                    </div>
                    <label className='text-blue-500 text-sm'>Forgot password?</label>
                    <input type="submit" value="Log In" className="bg-red-600 hover:bg-red-700 p-1.5 font-semibold rounded-lg cursor-pointer tracking-wider mx-auto block mt-4"/>

                </form>
            </div>
        </>

    );
}

export default LoginForm