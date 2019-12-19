import {useState, useEffect} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function CitySelect({cities, updateCities, value}) {
    const [selectedCities, setSelectedCities ]= useState([]);
    const [initialRender, setRender] = useState(true);
    const [defaultValue, setDefaultValue] = useState([])

    const options = cities.map(city => ({label: city.city, value: city.city}));

    const setCities = (evt) => {
        if(evt && evt.length > 0){
            const values = evt.map(city => city);
            const selectedOptions = options.filter(opt => values.find(val => val.value === opt.value));
            setDefaultValue(selectedOptions);
            setSelectedCities(values);           
        }else{
            setSelectedCities([]);
        }
    };

    useEffect(() => {
        if(cities.length > 0 && !initialRender){
            updateCities(selectedCities);
        }else{
            setRender(false);
        }
    }, [selectedCities]);

    useEffect(() => {
        let matches = selectedCities.filter(city => {
            return value.includes(city)
        });
        if(!matches.length > 0){   
            const selectedOptions = options.filter(opt => value.includes(opt.value));
            setDefaultValue(selectedOptions);
            setSelectedCities(value);
        }
    }, [value])


    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="cities">Cities</label>
                <Select isMulti 
                        label="Cities"
                        id="cities"
                        components={animatedComponents}
                        onChange={setCities}
                        value={defaultValue}
                        closeMenuOnSelect={false} 
                        hideSelectedOptions={true} 
                        options={options} />
            </div>
        </div>
    )
}