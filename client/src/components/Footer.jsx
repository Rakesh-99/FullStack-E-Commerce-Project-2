import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {


    // class name for active link :
    const activeLink = 'text-white underline underline-offset-8 mx-5 text-green-300 decoration-2 decoration-green-500  text-green-200 ';
    const linkNotActive = 'text-white mx-5';

    return (
        <>
            <div className="bg-gray-900 py-5 text-center">
                <div className="my-2">
                    <h2 className='text-white'> Copyright © All rights reserved | Designed by Rakesh Kumar Parida</h2>
                </div>
                <div className="">
                    <NavLink to={'/about'} className={({ isActive }) => isActive ? activeLink : linkNotActive}>About</NavLink>
                    <NavLink to={'/contact'} className={({ isActive }) => isActive ? activeLink : linkNotActive}>Contact</NavLink>
                    <NavLink to={'/privacy-policy'} className={({ isActive }) => isActive ? activeLink : linkNotActive}>Privacy Policy</NavLink>
                </div>
            </div>
        </>
    )
}

export default Footer;