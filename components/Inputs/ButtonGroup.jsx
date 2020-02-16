import {useState, useEffect} from 'react';

export default function ButtonGroup({options, label, changeHandler, value}){
    const [selected, setSelected] = useState('');

    const handleChange = (evt) => {
        const value = evt.target.dataset.value;
        if(selected !== value){
            setSelected(value);
            changeHandler(value)
        }else{
            setSelected('');
            changeHandler('')
        }
    }

    useEffect(() => {
        if(value !== selected){
            setSelected(value);
        }
    }, [value])

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