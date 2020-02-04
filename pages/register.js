import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import RegisterForm from '../components/Register/Register';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';

const register = () => {

  return (
    <div className="register">
      <Head>
        <title>KM - Register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Register" />
        <RegisterForm />     
      </div>    
      <div className="footer-wrapper">
        <Footer />
      </div>
        <style jsx>{`
          .register{
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}</style>
    </div>
  )
}

export default register
