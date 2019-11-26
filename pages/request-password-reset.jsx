import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import LoginForm from '../components/Login/Login';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
import {useState} from 'react';
import emailValidator from '../validators/emailValidator';
import useForm from '../hooks/useForm';
import EmailInput from '../components/Inputs/EmailInput';
import FormActionsWrapper from '../components/Misc/FormActionsWrapper';
import http from '../helpers/http.helper';

const formFields = {
    email: {
        target: 'email',
        value: '',
        required: true,
        validators: [emailValidator]
    }
}

const requestPasswordReset = () => {
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    
    const submitEmail =  async (values) => {
        debugger;
        setProcessing(true)
        try{
            debugger;
            const res = await http.get(`api/request-reset/${values.email}`);
            const user = await res.json();
            setProcessing(false);
            setSuccess(true);
        }catch(err){
            setProcessing(false);
        }
    }

    const { handleChange, handleSubmit, fields, checkFieldValid} = useForm(formFields, submitEmail);

    const form = (
        <form onSubmit={handleSubmit} autoComplete="off" noValidate >
            <EmailInput {...fields.email} handleChange={handleChange} validate={checkFieldValid} />
            <FormActionsWrapper>
                <button type="submit" 
                        disabled={processing}
                        className="btn btn-primary float-right">Submit</button>
            </FormActionsWrapper>
            <style jsx>{`
                .password-reset{
                    text-align: center
                }
                .password-reset a{
                    font-size: 1.1rem;
                    color: #2E5D95;
                    cursor: pointer;
                }
            `}</style>
        </form>
    )


  return (
    <div className="password-reset">
      <Head>
        <title>KM - Password Reset</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <IndexNav />
        <PageHeader header="Password Reset" />
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="card">
                        <div className="card-body">
                        {
                            success ? 
                            <div>
                                <h5>Password reset email sent to the provided address.</h5>
                            </div>
                            :
                            form
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
            .password-reset{
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              h5{
                color: #5d656b;
              }
        `}</style>
    </div>
  )
}

export default requestPasswordReset;
