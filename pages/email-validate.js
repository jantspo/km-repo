import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
import http from '../helpers/http.helper';
import Router from "next/router";
import {useState, useEffect} from 'react';

const emailValidate = ({query}) => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const updateUser = async (token) => {
        try{
            const res = await http.put('api/validate-user', {token: token});
            const user = await res.json();
            if(user){
                setValidated(true);
                setTimeout(() => {
                    Router.push(`/login`);
                }, 5000);
            }
    
        }catch(err){
            console.log(err);
            setError(true);
        }
    };

    useEffect(() => {
        updateUser(query);
    }, [])

  return (
    <div className="EmailValidate">
      <Head>
        <title>KM - Account Validation</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Account Validation" />
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="card">
                        <div className="card-body">
                            {
                                !error ?
                                    validated ? 
                                    <div>
                                        <h4>Account validated! Your account is now active.</h4>
                                        <h5>Redirecting to login screen.</h5>
                                    </div> 
                                    :
                                    <div>
                                        <h4>Validating account.</h4>
                                    </div> 
                                : 
                                <div>Token is expired. Request new verification email? </div>
                            }
                        </div>
                    </div>
         
                </div>
            </div>  
        </div>
        
    </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
        <style jsx>{`
            .EmailValidate{
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            h4, h5{
                color: #5d656b;
            }
        `}</style>
    </div>
  )
}

emailValidate.getInitialProps = (({query}) => {
    return {query: query.token};
});

export default emailValidate;
