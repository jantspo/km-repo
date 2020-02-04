import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';

export default function contactUs () {
    return (
        <div className="register">
          <Head>
            <title>KM - Register</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div className="page-wrapper">
            <IndexNav />
            <PageHeader header="Contact Us" />
            <ContactForm />     
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