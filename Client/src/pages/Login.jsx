import React, { use, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/input'
import { Loader, Lock, Mail, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    const { isLoading, error, login} = useAuthStore();
    const handleLogin = async (e) => {
        e.preventDefault()
        // Handle sign-up logic here
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        icon={Mail}
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='text-sm text-gray-400'>
                        <Link to={"/forgot-password"} className='text-green-400 hover:underline'>
                            Forgot password?
                        </Link>
                    </p>
                    {error && <p className='text-red-500 text-sm mt-2 text-center font-semibold'>{error}</p>}
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Login"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                <p className='text-sm text-gray-400'>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className='text-green-400 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default login