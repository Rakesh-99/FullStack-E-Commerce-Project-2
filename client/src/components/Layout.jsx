import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';




const Layout = ({ children, description, keywords, author, title }) => {
    return (
        <>
            {/* React Helmet for SEO purpose  */}
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />
            <main className='h-[85vh] w-full'>
                {children}
                <Toaster />
            </main>
            <Footer />
        </>
    )
}
Layout.defaultProps = {
    title: 'Ecommerce App | Shop now',
    description: 'This app is built using MERN stack ',
    keywords: "React js, MongoDB, NodeJs, ExpressJs, TailwindCss",
    author: 'Rakesh Kumar Parida'
};

export default Layout;