import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import registerImg from '../Assests/registerImg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoaderAnimation from '../components/Loader/Loader';







const Register = () => {

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        fullname: '',
        email: '',
        password: '',
        location: ''

    });

    const inputChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value })
    }

    const submitHandle = (e) => {
        e.preventDefault();
        validateForm(registerData);
    }



    // Validating form Data :

    const validateForm = (values) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        // Username : 
        if (!values.fullname) {
            toast.error('User name filed is required!');
            return false;
        } else if (values.fullname.length < 5) {
            toast.error('User name should contain at least 5 chat!');
            return false;
        } else if (values.fullname.length > 30) {
            toast.error('User name can not exceed 30 char!');
        }

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
        } else if (!values.location) {
            toast.error('Location is required!');

        } else {
            // Performing post req for registering user only if the validation gets successful :

            try {
                setLoader(true);
                axios.post('/api/user/register', registerData)
                    .then((res) => {
                        if (res.status === 200) {
                            setLoader(false);
                            toast.success('User has been registered!');
                            navigate('/login');
                            return false;
                        }
                    }).catch((err) => {
                        setLoader(false);
                        if (err) {
                            toast.error('Email is already registered!');
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
        <Layout title={'Register'}>

            <h1 className='text-center mt-14  font-semibold text-transparent text-4xl bg-clip-text 
            bg-gradient-to-r from-cyan-500  to-green-900'>Register</h1>

            <div className="flex w-full justify-center space-x-2">

                {/* Left Content  */}
                <div className="w-1/4 flex justify-center">
                    <img src={registerImg} alt="img" className='w-96 bg-cover' />
                </div>

                {/* Right Content  */}
                <div className=" flex w-1/4 justify-center my-10">
                    {/* Condition for Spinner Animation while fetching data  */}
                    {loader === true ? <div className="flex h-full w-full justify-center items-center text-center"><LoaderAnimation /></div>
                        :
                        <form action="" className='flex flex-col w-80 space-y-4 ' onSubmit={submitHandle}>

                            {/* Full Name  */}
                            <input type="text" placeholder='Full Name*' className='border-b-2 py-1 px-3 border-green-400 rounded-sm  outline-none text-green-800 font-semibold' name='fullname' value={registerData.fullname} autoComplete='off' required onChange={inputChangeHandle} />

                            {/* Email  */}
                            <input type="email" placeholder='Email*' className='border-b-2 py-1 px-3 border-green-400 rounded-sm outline-none text-green-800 font-semibold' name='email' value={registerData.email} autoComplete='off' required onChange={inputChangeHandle} />

                            {/* Password  */}
                            <input type="password" placeholder='Password*' className='border-b-2 py-1 px-3 border-green-400 rounded-sm outline-none text-green-800 font-semibold' name='password' value={registerData.password} autoComplete='off' required onChange={inputChangeHandle} />

                            {/* Location  */}
                            <input type="text" placeholder='Location*' className='border-b-2 py-1 px-3 border-green-400 rounded-sm outline-none text-green-800 font-semibold' name='location' value={registerData.location} autoComplete='off' required onChange={inputChangeHandle} />

                            <button type='submit' className=' font-semibold rounded-sm bg-gradient-to-r from-cyan-700 to-green-700 text-white py-1 shadow-green-600 shadow-lg '>Register</button>

                            <p className='text-sm text-center'>Already have an account? <Link to={'/login'} className='text-green-700 cursor-pointer hover:underline'>Login</Link></p>
                        </form>
                    }

                </div>
            </div>
        </Layout>
    )
}

export default Register;