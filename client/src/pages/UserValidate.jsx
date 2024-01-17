import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import newPasswordImg from '../Assests/newPasswordImg.jpg';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { validateUser, updatePassword } from '../features/authSlice';




const UserValidate = () => {

    const { id, token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');


    const inputChangeHandle = (e) => {
        const { value } = e.target;
        setPassword(value)
    }

    const submitHandle = (e) => {
        e.preventDefault();
        formValidate(password);
    }


    const formValidate = async (value) => {

        if (!value) {
            toast.error('Password field can not be empty!');
            return false;
        } else if (value.length < 6) {
            toast.error('Password can not be less than 6 char!');
            return false;
        } else {
            dispatch(updatePassword({ id, token, password, setPassword, navigate }));
        }

    }

    useEffect(() => {
        dispatch(validateUser({ id, token, navigate }));
    }, []);



    return (
        <Layout>

            <div className=" flex flex-col md:flex-row w-full justify-center items-center mt-32 md:mt-10 ">

                {/* Left Content  */}
                <div className="w-1/4 justify-center flex">
                    <div className="bg-cover w-96">
                        <img src={newPasswordImg} alt="img" className='w-full rounded-md' />
                    </div>
                </div>

                {/* Right Content  */}
                <div className="w-1/4 flex justify-center">


                    <form action="" className='flex flex-col gap-4' onSubmit={submitHandle}>

                        <h1 className='text-center font-semibold text-2xl text-fuchsia-500'>Update Password</h1>

                        <input type="password" className='w-80 py-2 px-3 border-b-2  border-purple-700 rounded-sm outline-none' name="password" placeholder='Enter your new password *' onChange={inputChangeHandle} />

                        <button type='submit' className='w-80 bg-fuchsia-700 active:bg-green-800 shadow-lg shadow-orange-100  text-white rounded-sm py-1 '>Update</button>

                        <Link to={'/'} className='bg-slate-800 py-1 text-center rounded-sm text-white cursor-pointer'>Cancel</Link>

                    </form>

                </div>
            </div>
        </Layout>
    )
}
export default UserValidate;