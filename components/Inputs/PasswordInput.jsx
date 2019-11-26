
import {useState} from 'react';

export default function PasswordInput({fieldName, required, value, handleChange, target, errors, valid, validate, autocomplete}) {
    const title = fieldName || 'Password';
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
            <label htmlFor="userPassword">{title}{required && <span>*</span>}</label>
            <input type="password" 
                   className="form-control"
                   id="userPassword"
                   formNoValidate
                   autoComplete={autocomplete}
                   value={defaultValue}
                   onBlur={checkValidation}
                   onChange={updateValue}
                   aria-describedby="password" 
                   placeholder="Enter Password" />
            {
                !valid && 
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