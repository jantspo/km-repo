import FormActionsWrapper from '../Misc/FormActionsWrapper';
import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import useForm from '../../hooks/useForm';
import emailValidator from '../../validators/emailValidator';
import passwordValidator from '../../validators/passwordValidator';
import Link from 'next/link';
import {useState} from 'react';
import Router from "next/dist/client/router";
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
    }
}

export default function LoginForm () {
    const [loginError, setLoginError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const login =  async (values) => {
        setSaving(true)
        try{
            const res = await http.post('api/login', values);
            const user = await res.json();
            window.sessionStorage.setItem('user', JSON.stringify(user));
            setSaving(false);
            setSuccess(true);
            setTimeout(() => {
                Router.push(`/account`);
                // Router.push(`/account?user=${JSON.stringify(user)}`, `/account`);
            }, 1500);
        }catch(err){
            setLoginError(true);
            setSaving(false);
        }
    }

    const requestReset = () => {
        Router.push('/request-password-reset')
    }

    const { handleChange, handleSubmit, fields, checkFieldValid} = useForm(formFields, login);

    const form = (
        <form onSubmit={handleSubmit} autoComplete="on" >
            <EmailInput {...fields.email} handleChange={handleChange} validate={checkFieldValid} />
            <PasswordInput {...fields.password} handleChange={handleChange} validate={checkFieldValid} autocomplete={'on'}/>
            {
                loginError && 
                <p className="err-msg">Invalid credentials. Please verify email and password are correct.</p>
            }
            {
                saving ? 
                'Loggin In' :
                <FormActionsWrapper>
                    <button type="submit" 
                            className="btn btn-primary float-right">Submit</button>
                </FormActionsWrapper>
            }
            <div className="password-reset">
                <a onClick={requestReset}>Forget password?</a>
            </div>
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
        <div className="container Login">
            <div className="row">
                <div className="col-xs-12 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="card">
                        <div className="card-body">
                            {
                                success ? 
                                <div>
                                    <h5>Logged in!</h5>
                                    <h6>Redirecting...</h6>
                                </div>  : 
                                form
                            }
                            <hr />
                            <h5>New to Kastlemark?</h5> 
                            <Link href="/register">
                                <h5><a>Click here to Register.</a></h5>
                            </Link>
                        </div>    
                    </div>
                </div>
            </div>
            <style jsx>{`
                h5{
                    color: #5d656b;
                    font-size: 1.1rem
                }
                h6{
                    color: #5d656b;
                }
                h5 a{
                    font-size: 1.1rem;
                    color: #2E5D95;
                    cursor: pointer;
                }
                .Login{
                    margin-bottom: 60px;
                }
            `}</style>
        </div>
    )
}