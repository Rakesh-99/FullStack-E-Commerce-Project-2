import React from 'react'
import Layout from '../components/Layout';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Layout title={'Oops - Page not found'}>
            <div className=" w-full flex justify-center items-center h-full flex-col space-y-5">
                <h1 className='text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-6xl'>Page Not Found | 404</h1>
                <Link to={'/'} className='text-black border active:bg-green-500 border-green-800 px-3 py-2 rounded-md'><span className='flex items-center space-x-2'><FaCircleArrowLeft /> <p>Go Back</p></span></Link>
            </div>
        </Layout>
    )
}

export default PageNotFound