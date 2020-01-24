export default function CheckboxInput ({value, fieldName, handleChange, target}) {
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
               value={true}
               id={target} 
               defaultValue={value} 
               onChange={update} />
        <label className="form-check-label" htmlFor={target}>
            {fieldName}
        </label>
    </div>
}