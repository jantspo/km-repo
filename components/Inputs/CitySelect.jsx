import {useState, useEffect} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function CitySelect({cities, updateCities}) {
    const [selectedCities, setSelectedCities ]= useState([]);
    const [initialRender, setRender] = useState(true);

    const options = cities.map(city => ({label: city.city, value: city.city}));

    const setCities = (evt) => {
        if(evt && evt.length > 0){
            const values = evt.map(city => city);
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

    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="ciies">Cities</label>
                <Select isMulti 
                        label="Cities"
                        components={animatedComponents}
                        onChange={setCities}
                        closeMenuOnSelect={false} 
                        hideSelectedOptions={true} 
                        options={options} />
            </div>
        </div>
    )
}