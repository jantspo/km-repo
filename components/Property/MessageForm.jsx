
import useForm from '../../hooks/useForm';
import {useState, useEffect} from 'react';
import {TextAreaInput, CheckboxInput} from '../Inputs/index';
import http from '../../helpers/http.helper';
import {getUserAlertStatus} from '../../helpers/user.helper';

const formFields = {
    message: {
        target: 'message',
        fieldName: 'Message',
        value: '',
        placeholder: '',
        required: true
    },
    email_alerts: {
        target: 'email_alerts',
        value: false,
        fieldName: 'Receive email notifications for this message\'s responses?'
    }
};

export default function ({close, propertyId, userAlerts}) {
    const [saved, setSaved] = useState(false);

    const save = async (formData) => {    
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        try{
            console.log(formData);
            const data = {...formData, km_user_id: userId, asset_id: propertyId};

            const res = await http.post('api/messages', data);
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
    
    useEffect(() => {
        handleChange({target: 'email_alerts', value: getUserAlertStatus()});
    }, [])

    return (
        <div>
            {
                saved ? 
                <div className="alert alert-primary">
                    Message Sent! Redirecting to your messages.
                </div>
                :
                <form onSubmit={handleSubmit} className="margin-bottom-10">
                    <TextAreaInput {...fields.message} handleChange={handleChange}/>
                    <CheckboxInput {...fields.email_alerts} handleChange={handleChange} />
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={close}>Cancel</button>
                    </div>
                </form>
            }
        </div>

    )
}