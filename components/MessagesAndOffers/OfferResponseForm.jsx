
import useForm from '../../hooks/useForm';
import {useState} from 'react';
import {MoneyInput, TextAreaInput} from '../Inputs/index';
const formFields = {
    offer: {
        target: 'offer',
        fieldName: 'Offer',
        value: '',
        placeholder: '',
        required: false
    },
    message: {
        target: 'message',
        fieldName: 'Comment',
        value: '',
        placeholder: '',
        required: false
    }
};

export default function OfferResponseForm({close, save, offerId}) {
    const [saved, setSaved] = useState(false);
    
    const saveOffer = (formData) => {
        save({...formData, thread_id: offerId});
    }

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(formFields, saveOffer);

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
                        <button type="submit" className="btn btn-primary" disabled={!fields.offer.value > 0 || !fields.message.value.length > 0}>Submit</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={close}>Cancel</button>
                    </div>
                </form>
            }
        </div>

    )
}