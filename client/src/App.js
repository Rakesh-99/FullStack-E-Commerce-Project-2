import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ForgetPassword from './pages/ForgetPassword';
import UserValidate from './pages/UserValidate';





const App = () => {




    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='*' element={<PageNotFound />} />
                    <Route path='/forgetpassword' element={<ForgetPassword />} />
                    <Route path='/uservalidate/:id/:token' element={<UserValidate />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App;


