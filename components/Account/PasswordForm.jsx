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

function PasswordForm ({toggleForm, userId}) {
    console.log(userId);
    const [regError, setRegError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errMsg, setErrMsg] = useState('There was an error creating your account.')
    
    const register =  async (values) => {
        setSaving(true);
        try{
            debugger;
            const res = await http.put('api/update-password', { ...values, id: userId});
            setSuccess(true);
            setSaving(false);
            setTimeout(() => {
                toggleForm();
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
                        <button type="button" 
                                className="btn btn-danger float-right margin-left" onClick={toggleForm}>Cancel</button>
                    </FormActionsWrapper>
                }

            </form>
            <style jsx>{`
                width: 100%;
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
                .margin-left{
                    margin-left: 10px;
                }
            `}</style>
        </div>
    );

    return (
        <div>
            {   success ?
                <h5>Password Changed</h5> :
                form
            }
            <style jsx>{`
                width: 100%;
                margin-bottom: 20px;
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

export default PasswordForm;