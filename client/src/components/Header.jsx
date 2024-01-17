import React, { useEffect, useState, } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';







const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { user } = useSelector((state) => state.app);


    const [isClick, setIsClick] = useState(false);

    const toggleMenu = () => {
        setIsClick(!isClick);
    };


    const handleLogout = () => {
        dispatch(logoutUser({ navigate }));
    }




    return (
        <>

            {/* Nav For Md,lg,xl Devices :  */}
            <nav className='w-full bg-black py-4 sticky top-0 left-0'>

                <div className='text-white items-center justify-between px-10 hidden md:flex '>

                    <div className="flex items-center  text-white hover:text-red-500 cursor-pointer">
                        <MdOutlineShoppingBag size={25} />
                        <NavLink to={'/'}>E-Commerce</NavLink>
                    </div>

                    <div className="flex gap-5">
                        <NavLink to={'/'} className={`hover:text-yellow-300 ${window.location.pathname === '/' && 'border-b border-yellow-400 text-yellow-200'}`}>Home</NavLink>
                        <NavLink to={'/category'}>Category</NavLink>
                    </div>

                    <div className="flex items-center">
                        <input type="search" name="" className='py-1 px-2 rounded-sm bg-gray-800 outline-none' placeholder='Search Item..' />
                    </div>

                    {
                        !user ? <div className="flex gap-5">
                            <NavLink to={'/register'} className={`hover:text-green-300 ${window.location.pathname === '/register' && 'border-b border-green-500 text-green-300'}`}>Register</NavLink>

                            <NavLink to={'/login'} className={`hover:text-blue-300 ${window.location.pathname === '/login' && 'border-b border-blue-500 text-blue-300'}`}>Login</NavLink>
                        </div> : <><NavLink onClick={handleLogout} className='bg-red-900 text-white rounded-sm py-1 px-2'>Logout</NavLink></>
                    }




                    <div className="">
                        <NavLink><FaShoppingCart className='hover:text-orange-200' /></NavLink>
                    </div>
                </div>


                {/* For Small devices :  */}

                <div className="">

                    <div className="md:hidden flex justify-around items-center">

                        <span className='flex items-center '>
                            <MdOutlineShoppingBag color='white' />

                            <NavLink to={'/'} className={`text-white max-[370px]:text-sm${window.location.pathname === '/' && 'text-red-400 border-b border-red-600'}`}>E-Commerce</NavLink>
                        </span>

                        {/* Input Search  */}
                        <input type="text" placeholder='Search item' className='py-1 px-2 text-white rounded-sm bg-gray-800 outline-none max-[370px]:w-20 max-[370px]:text-sm ' />

                        <span><FaShoppingCart color={'white'} size={18} /></span>

                        <span className='cursor-pointer' onClick={toggleMenu}>{isClick ? <RxCross2 size={24} color='white' /> : <IoMenu size={25} color='white' />}</span>
                    </div>


                    {isClick &&
                        <div className="text-white md:hidden flex flex-col h-[50vh] gap-5  justify-center items-center transition-all duration-500 ">
                            <NavLink to={'/'} className={`hover:text-yellow-300 ${window.location.pathname === '/' && 'border-b text-yellow-300 border-yellow-500'}`}>Home</NavLink>

                            <NavLink to={'/category'} className={`${window.location.pathname === '/category' && 'border-b border-yellow-500 text-yellow-300'}`}>Category</NavLink>

                            <NavLink to={'/register'} className={`hover:text-green-300${window.location.pathname === '/register' && ' border-green-500 border-b text-green-300'}`}>Register</NavLink>

                            <NavLink to={'/login'} className={`${window.location.pathname === '/login' && 'border-b border-blue-500 text-blue-300'}`}>Login</NavLink>

                        </div>
                    }
                </div>
            </nav>



        </>
    )
};

export default Header;