
import {useState} from 'react';

export default function EmailInput({fieldName, required, value, handleChange, target, errors, valid, validate}) {
    const title = fieldName || 'Email Address';
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
            {/* <label htmlFor="userEmail">{`${title}${required && '*'}`}</label> */}
            <label htmlFor="userEmail">{title}{required && <span>*</span>}</label>
            <input type="email" 
                   formNoValidate
                   className="form-control"
                   id={fieldName}
                   value={defaultValue}
                   onBlur={checkValidation}
                   onChange={updateValue}
                   aria-describedby="emailHelp" 
                   placeholder="Enter email" />
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