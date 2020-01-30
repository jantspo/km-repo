export default function CheckboxInput ({value, fieldName, handleChange, target}) {
    const update = (evt) => {
        evt.persist();
        debugger;
        handleChange({
            target: target,
            value: evt.target.checked
        })
    }

    return <div className="form-check">
        <input className="form-check-input" 
               type="checkbox" 
               id={target} 
               checked={value}
               onChange={update} />
        <label className="form-check-label" htmlFor={target}>
            {fieldName}
        </label>
    </div>
}