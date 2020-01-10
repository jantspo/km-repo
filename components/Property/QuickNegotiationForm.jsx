import {MoneyInput, TextAreaInput} from '../Inputs/index';
import useForm from '../../hooks/useForm';
import formFields from './quickNegotiationFields'
import http from '../../helpers/http.helper';
import { useState } from 'react';

export default function QuickNegotiationForm({close, propertyId}){
    const [saved, setSaved] = useState(false);
    const save = async (formData) => {
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        try{
            const data = {...formData, km_user_id: userId, asset_id: propertyId};
            console.log(res);
            const res = await http.post('api/offers', data);
            const mess = await res.json();
            setSaved(true);
            setTimeout(() => {
                close();
            }, 2000);
        }catch(err){
            console.log(err);
        }
    }

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(formFields, save);

    return (
        <div>
        {
            saved ? 
            <div className="alert alert-primary">
                Offer Sent!
            </div>
            :
            <form onSubmit={handleSubmit} className="margin-bottom-10">
                <MoneyInput {...fields.offer} handleChange={handleChange} />
                <TextAreaInput {...fields.message} handleChange={handleChange}/>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={close}>Cancel</button>
                </div>
            </form>
        }
        </div>

    )
}