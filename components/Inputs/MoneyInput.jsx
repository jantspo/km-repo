
import {useState, useEffect} from 'react';

export default function NumberInput({fieldName, required, value, handleChange, target, errors, valid, validate, placeholder, min, max}) {
    const title = fieldName || '';
    const [defaultValue, setValue] = useState(value);
    
    const updateValue = (evt) => {
        setValue(evt.target.value);
        handleChange({
            target: target,
            value: evt.target.value
        });
    }

    useEffect(() => {
        if(value !== defaultValue){
            setValue(value);
        }
    }, [value])

    const checkValidation = () => {
        if(validate){
            validate(target)
        }
    }

    return (
        <div className="input-group">
            <label htmlFor={title}>{title}{required && <span>*</span>}</label>
            <div className="input-group-prepend">
                <span className="input-group-text">$</span>
            </div>
            <input type="number" 
                   formNoValidate
                   className="form-control"
                   id={fieldName}
                   min={min || null}
                   max={max || null}
                   value={defaultValue}
                   onBlur={checkValidation}
                   onChange={updateValue}
                   aria-describedby={fieldName} 
                   placeholder={placeholder || ''} />
            {
                !valid && 
                errors &&
                errors.length > 0 && 
                errors.map(err => {
                    return <p key={err} className="err-msg" >{err}</p>
                })
            }
            <style jsx>{`
                label>span{
                    color: red
                }
            `}</style>
        </div>
    )
}