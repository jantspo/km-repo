import {MoneyInput, TextAreaInput, CheckboxInput} from '../Inputs/index';
import useForm from '../../hooks/useForm';
import formFields from './quickNegotiationFields'
import http from '../../helpers/http.helper';
import { useState, useEffect } from 'react';
import {getUserAlertStatus} from '../../helpers/user.helper';
import {useRouter} from 'next/router';
export default function QuickNegotiationForm({close, propertyId, userAlerts}){
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    const save = async (formData) => {
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        try{
            const data = {...formData, km_user_id: userId, asset_id: propertyId};
            const res = await http.post('api/offers', data);
            const mess = await res.json();
            setSaved(true);
            setTimeout(() => {
                router.push('/my-offers');
                close();
            }, 2000);
        }catch(err){
            console.log(err);
        }
    }

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(formFields, save);

    useEffect(() => {
        handleChange({target: 'email_alerts', value: getUserAlertStatus()});
    }, [])

    return (
        <div>
        {
            saved ? 
            <div className="alert alert-primary">
                Offer Sent! Redirecting to your offers.
            </div>
            :
            <form onSubmit={handleSubmit} className="margin-bottom-10">
                <MoneyInput {...fields.offer} handleChange={handleChange} />
                <TextAreaInput {...fields.message} handleChange={handleChange}/>
                <CheckboxInput {...fields.email_alerts} handleChange={handleChange} />
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={!fields.offer.value > 0}>Submit</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={close}>Cancel</button>
                </div>
            </form>
        }
        </div>

    )
}