import {useState, useEffect} from 'react';

export default function ButtonGroup({options, label, changeHandler}){
    const [selected, setSelected] = useState(null);

    const handleChange = (evt) => {
        debugger;
        const value = evt.target.dataset.value;
        if(selected !== value){
            setSelected(value);
            changeHandler(value)
        }else{
            setSelected(null);
            changeHandler(null)
        }
    }

    const Buttons = options.map(opt => {
        return (
            <button key={opt.value} 
                    type="button" 
                    data-value={opt.value}
                    className={`btn ${selected === opt.value ? 'btn-primary ' : 'btn-light'}`} 
                    onClick={handleChange}>
                {opt.label}
            <style>{`
                .btn{
                    border: 1px solid lightgrey;
                }
            `}</style>
            </button>
        )
    })

    return (
        <div>
            <label htmlFor="options" className="">{label}</label>
            <div className="btn-toolbar" role="toolbar" aria-label={label}>
                <div className="btn-group" role="group" aria-label={label}>  
                    {Buttons}
                </div>
            </div>
            <style jsx>{`
                .btn-group{
                    width: 100%
                }
            `}</style>
        </div>
       
    )
}