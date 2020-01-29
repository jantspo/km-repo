export default function CheckboxInput ({value, fieldName, handleChange, target}) {
    debugger;
    const update = (evt) => {
        evt.persist();
        handleChange({
            target: target,
            value: evt.target.value === 'true' ? true : false
        })
    }

    return <div className="form-check">
        <input className="form-check-input" 
               type="checkbox" 
               id={target} 
               checked={value}
               defaultValue={value} 
               onChange={update} />
        <label className="form-check-label" htmlFor={target}>
            {fieldName}
        </label>
    </div>
}