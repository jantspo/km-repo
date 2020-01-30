import FormActionsWrapper from '../Misc/FormActionsWrapper';
import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import GeneralInput from '../Inputs/GeneralInput';
import CheckboxInput from '../Inputs/CheckboxInput';
import useForm from '../../hooks/useForm';
import emailValidator from '../../validators/emailValidator';
import passwordValidator from '../../validators/passwordValidator';
import Link from 'next/link';
import {useState} from 'react';

import http from '../../helpers/http.helper';
const formFields = {
    email: {
        target: 'email',
        value: '',
        required: true,
        validators: [emailValidator]
    },
    password: {
        target: 'password',
        value: '',
        required: true,
        validators: [passwordValidator]
    },
    verify_password: {
        target: 'verify_password',
        value: '',
        fieldName: "Verify Password",
        required: true,
        validators: [passwordValidator]
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
    sms_alerts: {
        target: 'sms_alerts',
        value: false,
        fieldName: 'Receive sms (text) notifications for responses to your offers and messages?'
    },
    email_alerts: {
        target: 'email_alerts',
        value: false,
        fieldName: 'Receive email notifications for responses to your offers and messages?'
    }
}

export default function RegisterForm () {
    const [regError, setRegError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errMsg, setErrMsg] = useState('There was an error creating your account.')
    
    const register =  async (values) => {
        setSaving(true);
        try{
            const res = await http.post('api/register', values);
            setSuccess(true);
            setSaving(false);
        }catch(err){
            const error = await err.json();
            if(error.includes('Email')) setErrMsg(error)
            else setErrMsg('There was an error creating your account.');
            setRegError(true);
            setSaving(false);
        }
    }

    const { handleChange, handleSubmit, fields, checkFieldValid} = useForm(formFields, register);

    const validatePasswordConfirmation = (evt) => {
        checkFieldValid('verify_password');
        const field = fields.verify_password;
        if(!field.errors)field.errors = [];
        if(field.value.length > 0) {            
            if (field.value !== fields.password.value){
                field.errors.push('Verify Password field must match Password field.');
            }
            if(field.errors.length > 0) field.valid = false;
            else field.valid = true;
        }
    }

    const submit = (evt) => {
        evt.preventDefault();
        validatePasswordConfirmation(fields.verify_password);
        if(!fields.verify_password.errors.length > 0)
            handleSubmit();
    }

    const form = (
        <div>
            <form onSubmit={submit} autoComplete="off" >
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
                    <div className="col-12 col-sm-6">
                        <PasswordInput {...fields.password} handleChange={handleChange} validate={checkFieldValid} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <PasswordInput {...fields.verify_password} handleChange={handleChange} validate={validatePasswordConfirmation} />
                    </div>
                </div>
                
                <CheckboxInput {...fields.email_alerts} handleChange={handleChange} />
                {/* <CheckboxInput {...fields.sms_alerts} handleChange={handleChange} /> */}
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
            <hr />
            <div className="Register-login">
                <h5>Already have an account?</h5> 
                <Link href="/login">
                    <h5><a>Click here to Login.</a></h5>
                </Link>
            </div>
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
                                <h5>Account created! Please check your email for confirmation.</h5> :
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