import useForm from '../../hooks/useForm';
import accountFields from './accountSettings.formFields';
import {GeneralInput, EmailInput, NumberInput, GeneralStateDropdown, PhoneNumberInput, CheckboxInput} from '../Inputs/index';

export default function AccountSettingsForm ({update, toggleForm, user, saving}) {
    const save = (data) => {
        update(data)
    };

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(accountFields, save, user);

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 col-md-5">
                    <GeneralInput {...fields.first_name} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-2">
                    <GeneralInput {...fields.initial} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-5">
                    <GeneralInput {...fields.last_name} handleChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <GeneralInput {...fields.company_name} handleChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8">
                    <GeneralInput {...fields.address} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-4">
                    <GeneralInput {...fields.address_2} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-5">
                    <GeneralInput {...fields.city} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-5">
                    <GeneralStateDropdown {...fields.state} handleChange={handleChange} />
                </div>
                <div className="col-12 col-md-2">
                    <NumberInput {...fields.zip} handleChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <EmailInput {...fields.email} handleChange={handleChange}/>
                </div>
                <div className="col-12 col-md-6">
                    <PhoneNumberInput {...fields.cell} handleChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <CheckboxInput {...fields.email_alerts} handleChange={handleChange} />
                </div>
                <div className="col-12">
                    <CheckboxInput {...fields.sms_alerts} handleChange={handleChange} />
                </div>
            </div>
            <div className="form-actions">
                <button className="btn btn-primary btn-sm" type="submit" disabled={saving}>
                    <i className="far fa-save" /> &nbsp; Save
                </button>&nbsp;&nbsp; 
                <button className="btn btn-danger btn-sm" type="button" onClick={toggleForm}>
                    <i className="fa fa-times" />&nbsp;Cancel
                </button>
            </div>
        </form> 
    )
}