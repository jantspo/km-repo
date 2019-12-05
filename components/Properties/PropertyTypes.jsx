import {useState, useEffect} from 'react';
export default function PropertyTypes({propertyTypes, updatePropTypes}) {
    const [selectedTypes, setSelectedTypes ]= useState([]);

    const setPropType = (evt) => {
        if(selectedTypes.find(type => type == evt.target.value)){
            const newTypes = selectedTypes.filter(type => type != evt.target.value);
            setSelectedTypes(newTypes);
        }else{
            const newTypes = [...selectedTypes, parseInt(evt.target.value)];
            setSelectedTypes(newTypes);
        }
    };

    useEffect(() => {
        updatePropTypes(selectedTypes);
    }, [selectedTypes]);

    const getCheckboxes = (PropertyTypes) => {
        return PropertyTypes.map(propType => {
            return <div className="col-6" key={propType.id}>
                       <div className="form-check">
                          <input className="form-check-input" type="checkbox" value={propType.id} id={propType.name} onClick={setPropType} />
                          <label className="form-check-label" htmlFor={propType.name}>
                              {propType.name}
                          </label>
                       </div>
                   </div>
       })
   }
   
   
    return (
        <div className="row">
            {getCheckboxes(propertyTypes)}
        </div>
    )
}