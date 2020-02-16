import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
const register = ({token}) => {
  return (
    <div className="reset-password">
      <Head>
        <title>KM - Reset Password</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Reset Password" />
        <ResetPasswordForm token={token} />     
      </div>    
      <div className="footer-wrapper">
        <Footer />
      </div>
        <style jsx>{`
          .reset-password{
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}</style>
    </div>
  )
}

register.getInitialProps = (({query}) => {
    return {token: query.token};
});

export default register
