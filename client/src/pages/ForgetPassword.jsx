import React, { useState } from 'react'
import Layout from '../components/Layout';
import resetPasswordImg from '../Assests/resetPasswordImg.jpg';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../features/authSlice';
import LoaderAnimation from '../components/Loader/Loader';






const ForgetPassword = () => {


    const { loading } = useSelector((state) => state.app);


    const dispatch = useDispatch();


    const [emailInfo, setEmailInfo] = useState('');


    const inputChangeHandle = (e) => {
        setEmailInfo(e.target.value);
    }


    const submitHandle = (e) => {
        e.preventDefault();
        validateEmail(emailInfo);


    }

    const validateEmail = (data) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!data) {
            toast.error('Email field is required!');
            return false;
        } else if (!regEx.test(data)) {
            toast.error('Invalid email entered!');
            return false;
        } else {
            dispatch(forgetPassword({ email: emailInfo }))
        }
    }


    return (
        <Layout>

            <div className=" flex flex-col md:flex-row w-full justify-center items-center mt-32 md:mt-10 ">

                {/* Left Content  */}
                <div className="w-1/4 justify-center flex">
                    <div className="bg-cover w-96">
                        <img src={resetPasswordImg} alt="img" className='w-full rounded-md' />
                    </div>
                </div>

                {/* Right Content  */}
                <div className="w-1/4 flex justify-center">

                    {loading === true ? <LoaderAnimation /> :
                        <form action="" className='flex flex-col gap-4' onSubmit={submitHandle}>

                            <h1 className='text-center font-semibold text-2xl text-orange-400'>Forget Password</h1>

                            <input type="email" className='w-80 py-2 px-3 border-b-2  border-orange-700 rounded-sm outline-none' name="email" placeholder='Enter your email*' onChange={inputChangeHandle} value={emailInfo} />

                            <button className='w-80 bg-orange-700 active:bg-orange-800 shadow-lg shadow-orange-100  text-white rounded-sm py-1 '>Send</button>

                            <Link to={'/login'} className='bg-slate-800 py-1 text-center rounded-sm text-white cursor-pointer'>Cancel</Link>

                        </form>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ForgetPassword;