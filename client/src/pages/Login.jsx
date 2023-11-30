import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import loginImg from '../Assests/loginImg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoaderAnimation from '../components/Loader/Loader';







const Login = () => {

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({

        email: '',
        password: '',


    });

    const inputChangeHandle = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }

    const submitHandle = (e) => {
        e.preventDefault();
        validateForm(loginData);
    }



    // Validating form Data :

    const validateForm = (values) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/



        // Email :

        if (!values.email) {
            toast.error('Email is required!');
            return false;
        } else if (!regEx.test(values.email)) {
            toast.error('Please input a valid email!');
            return false;
        }

        // Password : 
        if (!values.password) {
            toast.error('Password is required!');
            return false;
        } else if (values.password.length < 6) {
            toast.error('Password can not be less that 6 char!');
            return false;

        } else {
            // Performing post req for login  user only if the validation gets successful :


            try {
                setLoader(true);
                axios.post('/api/user/login', loginData)
                    .then((res) => {
                        if (res.status === 200) {
                            toast.success('Login Successful');
                            navigate('/');
                        }
                    }).catch((err) => {
                        setLoader(false);

                        if (err.response.data.message === 'User is not registered!') {
                            toast.error('User is not registered!')
                            return false;
                        } else if (err.response.data.message === 'Incorrect Password entered!') {
                            toast.error('Incorrect Password entered!');
                            return false;
                        }
                    });
            } catch (error) {
                setLoader(false);
                if (error) {
                    toast.error('Internal Server Error!');
                }
            }
        }
    };






    return (
        <Layout title={'Login'}>

            <h1 className='text-center mt-14  font-semibold text-transparent text-4xl bg-clip-text 
            bg-gradient-to-r from-cyan-500  to-blue-900'>Login</h1>

            <h1 className='text-center mt-2font-semibold text-transparent text-xl bg-clip-text 
            bg-gradient-to-r from-cyan-500  to-blue-900'>Welcome Back</h1>

            <div className="flex w-full justify-center space-x-2">

                {/* Left Content  */}
                <div className="w-1/4 flex justify-center">
                    <img src={loginImg} alt="img" className='w-96 bg-cover' />
                </div>

                {/* Right Content  */}
                <div className=" flex w-1/4 justify-center my-10">
                    {/* Condition for Spinner Animation while fetching data  */}
                    {loader === true ? <div className="flex h-full w-full justify-center items-center text-center"><LoaderAnimation /></div>
                        :
                        <form action="" className='flex flex-col w-80 space-y-4 ' onSubmit={submitHandle}>

                            {/* Email  */}
                            <input type="email" placeholder='Email*' className='border-b-2 py-1 px-3 border-blue-400 rounded-sm outline-none text-blue-800 font-semibold' name='email' value={loginData.email} autoComplete='off' required onChange={inputChangeHandle} />

                            {/* Password  */}
                            <input type="password" placeholder='Password*' className='border-b-2 py-1 px-3 border-blue-400 rounded-sm outline-none text-blue-800 font-semibold' name='password' value={loginData.password} autoComplete='off' required onChange={inputChangeHandle} />

                            <button type='submit' className=' font-semibold rounded-sm bg-gradient-to-r from-cyan-700 to-blue-700 text-white py-1 shadow-blue-600 shadow-lg '>Login</button>

                            <p className='text-sm text-center'>Don't have an account? <Link to={'/register'} className='text-blue-700 cursor-pointer hover:underline'>Register</Link></p>
                        </form>
                    }

                </div>
            </div>
        </Layout>
    )
}

export default Login;