import FormActionsWrapper from '../Misc/FormActionsWrapper';
import PasswordInput from '../Inputs/PasswordInput';
import useForm from '../../hooks/useForm';
import passwordValidator from '../../validators/passwordValidator';
import {useState} from 'react';
import Router from 'next/router';

import http from '../../helpers/http.helper';
const formFields = {
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
    }
}

function ResetPasswordForm ({token}) {
    const [regError, setRegError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errMsg, setErrMsg] = useState('There was an error creating your account.')
    
    const register =  async (values) => {
        setSaving(true);
        try{
            const res = await http.put('api/change-password', { ...values, token: token});
            setSuccess(true);
            setSaving(false);
            setTimeout(() => {
                Router.push('/login');
            }, 1500)
        }catch(err){
            const error = await err.json();
            if(error.includes('Email')) setErrMsg(error)
            else setErrMsg('There was an error resetting your password.');
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
                <PasswordInput {...fields.password} handleChange={handleChange} validate={checkFieldValid} />
                <PasswordInput {...fields.verify_password} handleChange={handleChange} validate={validatePasswordConfirmation} />
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
        <div className="container ResetPassword">
            <div className="row">
                <div className="col-xs-12 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="card">
                        <div className="card-body">
                            {   success ?
                                <h5>Password reset! Redirecting to login page...</h5> :
                                form
                            }
                        </div>    
                    </div>
                </div>
            </div>
            <style jsx>{`
                .ResetPassword{
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

export default ResetPasswordForm;