import React, { useState } from 'react'
import { useAuth } from '../middleware/AuthContext';
import { useNavigate } from "react-router-dom"


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, email, password);
        navigate('/dashboard');
    };

    return (
        <div className='align-items-center m-auto w-1/2 text-center'>
            <h1 className='text-2xl'>Welcome to  <code>Unbound</code></h1>
            <form onSubmit={handleSubmit} className='my-8'>
                <input
                    type="text"
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    className="focus:outline-none rounded-md p-2 mt-2 w-full" 
                />
                <input
                    type="text"
                    placeholder='Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                    className='focus:outline-none rounded-md p-2 mt-2 w-full'
                />
                <input
                    type="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='focus:outline-none rounded-md p-2 mt-2 w-full'
                />
                <button type='submit' className="focus:outline-none mt-4 w-full rounded-md">Join</button>
            </form>
        </div>
    )
}
