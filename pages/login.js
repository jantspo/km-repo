import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import LoginForm from '../components/Login/Login';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';

const login = () => {
  return (
    <div>
      <Head>
        <title>KM - Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Login" />
        <LoginForm />     
      </div>
      
      <div className="footer-wrapper">
        <Footer />
      </div>
        <style jsx>{`
            @media screen and (min-width: 768px){
                .footer-wrapper{
                    position: fixed;
                    width: 100%;
                    bottom: 0;
                }       
            }
        `}</style>
    </div>
  )
}

export default login
