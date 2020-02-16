
import {useState} from 'react';

export default function GeneralInput({fieldName, required, value, handleChange, target, errors, valid, validate, placeholder}) {
    const title = fieldName || '';
    const [defaultValue, setValue] = useState(value);
    
    const updateValue = (evt) => {
        setValue(evt.target.value);
        handleChange({
            target: target,
            value: evt.target.value
        });
    }

    const checkValidation = () => {
        if(validate){
            validate(target)
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={title}>{title}{required && <span>*</span>}</label>
            <input type="text" 
                   formNoValidate
                   className="form-control"
                   id={title}
                   value={defaultValue}
                   onBlur={checkValidation}
                   onChange={updateValue}
                   aria-describedby="emailHelp" 
                   placeholder={placeholder || ''} />
            {
                !valid && errors && 
                errors.length > 0 && 
                errors.map(err => {
                    return <p key={err} className="err-msg" >{err}</p>
                })
            }
            <style jsx>{`
                span{
                    color: red
                }
            `}</style>
        </div>
    )
}