
import {useState} from 'react';

export default function PhoneNumberInput({fieldName, required, value, handleChange, target, errors, valid, validate, placeholder}) {
    const title = fieldName || '';
    const [defaultValue, setValue] = useState(value);

    const updateValue = (evt) => {
        let value = evt.target.value;
        value = value.replace(/[a-z]/gi, '');
        if(value.length > 14) {
            const newVal = formatNumber(value);
            setValue(newVal.substring(0, 14));
            handleChange({
                value: newVal.substring(0, 14),
                target: target
            });
        }else {
            setValue(value);
            handleChange({
                value: value,
                target: target
            });
        }
 
    };

    const checkValidation = () => {
        if(validate){
            validate(target)
        }
    }

    const formatNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        if(cleaned.length > 10) cleaned = cleaned.substring(0, 10);
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return ''
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
                !valid && 
                errors &&
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