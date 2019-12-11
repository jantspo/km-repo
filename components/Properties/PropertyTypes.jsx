import {useState, useEffect} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function PropertyTypes({propertyTypes, updatePropTypes, label}) {
    const [selectedTypes, setSelectedTypes ]= useState([]);
    
    const options = propertyTypes.map(propType => ({label: propType.name, value: propType.id}));

    const setPropType = (evt) => {
        if(evt && evt.length > 0){
            const values = evt.map(type => type.value);
            setSelectedTypes(values);
        }else{
            setSelectedTypes([]);
        }
    };

    useEffect(() => {
        updatePropTypes(selectedTypes);
    }, [selectedTypes]);

    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="property types">Property Types</label>
                <Select isMulti 
                        label={label}
                        components={animatedComponents}
                        onChange={setPropType}
                        closeMenuOnSelect={false} 
                        hideSelectedOptions={true} 
                        options={options} />
            </div>
        </div>
    )
}