import FormActionsWrapper from './Misc/FormActionsWrapper';
import useForm from '../hooks/useForm';
import Link from 'next/link';
import {useState} from 'react';
import {EmailInput, TextAreaInput, GeneralInput} from '../components/Inputs/index';
import emailValidator from '../validators/emailValidator';
import http from '../helpers/http.helper';
const formFields = {
    email: {
        target: 'email',
        fieldName: 'Email',
        value: '',
        required: true,
        validators: [emailValidator]
    },
    first_name: {
        target: 'first_name',
        fieldName: 'First Name',
        placeholder: 'Eg., John',
        value: '',
        required: true
    },
    last_name: {
        target: 'last_name',
        fieldName: 'Last Name',
        placeholder: 'Eg., Smith',
        value: '',
        required: true
    },
    message: {
        target: 'message',
        value: '',
        required: true,
        fieldName: 'Message'
    },
}

export default function RegisterForm () {
    const [regError, setRegError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errMsg, setErrMsg] = useState('There was an error sending your message.')
    
    const sendContactForm =  async (values) => {
        setSaving(true);
        try{
            const res = await http.post('api/contact-us', values);
            setSuccess(true);
            setSaving(false);
            setTimeout(() => {
                resetForm();
                setSuccess(false)
            }, 2000)
        }catch(err){
            setRegError(true);
            setSaving(false);
        }
    }

    const { handleChange, handleSubmit, fields, checkFieldValid, resetForm} = useForm(formFields, sendContactForm);



    const submit = (evt) => {
        evt.preventDefault();
        handleSubmit();
    }

    const form = (
        <div>
            {
                !success && <form onSubmit={submit} autoComplete="off" >
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <GeneralInput {...fields.first_name} handleChange={handleChange} validate={checkFieldValid} />
                        </div>
                        <div className="col-12 col-sm-6">
                            <GeneralInput {...fields.last_name} handleChange={handleChange} validate={checkFieldValid} />
                        </div>
                        <div className="col-12">
                            <EmailInput {...fields.email} handleChange={handleChange} validate={checkFieldValid} />
                        </div>
                        <div className="col-12">
                            <TextAreaInput {...fields.message} handleChange={handleChange} validate={checkFieldValid} />
                        </div>
                    </div>
                    {
                        regError && 
                        <p className="err-msg">{errMsg}</p>
                    }
                    {
                        saving ? 
                        <i className="fas fa-circle-notch" /> : 
                        <FormActionsWrapper>
                            <button type="submit" 
                                    className="btn btn-primary float-right">Submit</button>
                        </FormActionsWrapper>
                    }

                </form>
            }            
            <style jsx>{`
                .Register-login{
                    text-align: center;
                }
                h5{
                    color: #5d656b;
                    font-size: 1.1rem
                }
                h5 a{
                    font-size: 1.1rem;
                    color: #2E5D95
                }
            `}</style>
        </div>
    );

    return (
        <div className="container Register">
            <div className="row">
                <div className="col-xs-12 col-lg-8 offset-lg-2">
                    <div className="card">
                        <div className="card-body">
                            {   success ?
                                <p className="alert alert-primary">Messages sent. We will contact you shortly.</p> :
                                form
                            }
                        </div>    
                    </div>
                </div>
            </div>
            <style jsx>{`
                .Register{
                    margin-bottom: 60px;
                }
                h5{
                    color: #5d656b;
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    )
}