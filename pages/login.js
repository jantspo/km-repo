import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import LoginForm from '../components/Login/Login';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
import Router from "next/dist/client/router";

const login = () => {
  const redirect = () => {
    Router.push(`/properties`);
  }
  return (
    <div className="register">
      <Head>
        <title>KM - Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Login" />
        <LoginForm handleLogin={redirect}/>     
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

export default login
