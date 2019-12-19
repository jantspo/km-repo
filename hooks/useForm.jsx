import { useState } from 'react';

const useForm = (formFields, callback, data) => {
    
    const setFieldValues = (fields, data) => {
        const newForm = JSON.parse(JSON.stringify(fields));
        for (let x in newForm) {
            newForm[x].errors = [];
            newForm[x].valid = true;
            if(fields[x].validators && fields[x].validators.length > 0) 
                newForm[x].validators = fields[x].validators;
            if(data){
                if(newForm.hasOwnProperty(x) && data[x] !== null){
                    newForm[x].value = data[x]
                }
            }
        }
        return newForm;
    }

    const [fields, setFields] = useState(setFieldValues(formFields, data));

    const setupForm = (data) => {
        const form = setFieldValues(fields, data);
        setFields(form);
    }

    const validateField = (field) => {
        field.errors = [];
        debugger;
        console.log(field);
        if(field.value.length > 0 && field.validators  && field.validators.length > 0) {            
            field.validators.forEach(validator => {
                const res = validator(field.value);
                if(res !== true){
                    field.errors.push(res);
                }
            });
            if(field.errors.length > 0) field.valid = false;
            else field.valid = true;
        }else if(!field.value.length > 0 && field.required){
            field.valid = false;
            field.errors.push('Required.')
        }else {
            field.valid = true;
        }
        setFields(fields => ({ ...fields, [field.target]: field }));
        return field.valid
    }

    const checkFieldValid = (target) => {
        validateField(fields[target]);
    }

    const getValues = (fields) => {
        const values = {};
        for (let x in fields) {
            if(fields.hasOwnProperty(x) && fields[x].value){
                values[x] = fields[x].value
            }
        }
        return values;
    }

    const checkFormValid = (fields) => {
        let totalErrors = [];
        for(let x in fields){
            if(fields.hasOwnProperty(x)){
                const validField = validateField(fields[x]);
                if(validField) continue;
                else totalErrors.push(validField);
            }
        }
        if(totalErrors.length > 0){
            return false;
        }else {
            return true
        }
    }

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        if(checkFormValid(fields)){
            const values = getValues(fields)
            callback(values);
        }else {
            return false;
        }
    };

    const handleChange = (event) => {
        const field = fields[event.target];
        field.value = event.value
        setFields(fields => ({ ...fields, [event.target]: field }));
    };

    const checkNotNull = (value) => {
        if(typeof value === 'string'){
            return value.length > 0;
        }else if(value.constructor === Array){
            return value.length > 0
        }
    }

    const checkFormNotNull = (fields) => {
        const values = getValues(fields);
        const nulls = [];
        for(let x in values){
            if(values.hasOwnProperty(x)){
                nulls.push(checkNotNull(values[x]));
            }
        }
        return nulls.includes(true)
    }

    return {
        handleChange,
        handleSubmit,
        fields,
        checkFieldValid,
        getValues,
        checkFormNotNull,
        setupForm
    }
};

export default useForm;