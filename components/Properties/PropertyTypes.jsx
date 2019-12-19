import {useState, useEffect} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function PropertyTypes({propertyTypes, updatePropTypes, label, value}) {
    const [selectedTypes, setSelectedTypes ]= useState([]);
    const [defaultValue, setDefaultValue] = useState([])

    const options = propertyTypes.map(propType => ({label: propType.name, value: propType.id}));

    const setPropType = (evt) => {
        if(evt && evt.length > 0){
            const values = evt.map(type => type.value);
            const selectedOptions = options.filter(opt => values.find(val => val === opt.value));
            setDefaultValue(selectedOptions);
            setSelectedTypes(values);
        }else{
            setSelectedTypes([]);
        }
    };

    useEffect(() => {
        if(JSON.stringify(selectedTypes) !== JSON.stringify(value)){
            updatePropTypes(selectedTypes);
        }
    }, [selectedTypes]);

    useEffect(() => {
        let matches = selectedTypes.filter(type => {
            return value.includes(type);
        });

        if(!matches.length > 0){   
            const selectedOptions = options.filter(opt => value.includes(opt.value));
            setDefaultValue(selectedOptions);
            setSelectedTypes(value);
        }
    }, [value])

    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="property types">Property Types</label>
                <Select isMulti 
                        label={label}
                        components={animatedComponents}
                        onChange={setPropType}
                        value={defaultValue}
                        closeMenuOnSelect={false} 
                        hideSelectedOptions={true} 
                        options={options} />
            </div>
        </div>
    )
}