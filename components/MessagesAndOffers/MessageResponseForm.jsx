
import useForm from '../../hooks/useForm';
import {useState} from 'react';
import {TextAreaInput} from '../Inputs/index';
const formFields = {
    message: {
        target: 'message',
        fieldName: 'Message',
        value: '',
        placeholder: '',
        required: true
    }
};

export default function ({close, save, messageId}) {
    const [saved, setSaved] = useState(false);
    
    const saveMessage = (formData) => {
        save({...formData, thread_id: messageId});
    }

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(formFields, saveMessage);

    return (
        <div>
            {
                saved ? 
                <div className="alert alert-primary">
                    Message Sent!
                </div>
                :
                <form onSubmit={handleSubmit} className="margin-bottom-10">
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