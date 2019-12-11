import MoneyInput from '../Inputs/MoneyInput';
import StateDropdown from '../Inputs/StateDropdown';
import searchFields from './searchFields';
import useForm from '../../hooks/useForm';
import FormActionsWrapper from '../Misc/FormActionsWrapper';
import PropertyTypes from './PropertyTypes';
import CitySelect from '../Inputs/CitySelect';
import {useState, useEffect} from 'react'; 
import http from '../../helpers/http.helper';
import ButtonGroup from '../Inputs/ButtonGroup';

const beds = [
    {
        label: '1',
        value: '1'
    },
    {
        label: '2',
        value: '2'
    },
    {
        label: '3',
        value: '3'
    },
    {
        label: '4',
        value: '4'
    },
    {
        label: '5',
        value: '5'
    },
    {
        label: '6',
        value: '6'
    }
];

const baths = [
    {
        label: '1',
        value: '1'
    },
    {
        label: '1.5',
        value: "1.5"
    },
    {
        label: '2',
        value: "2"
    },
    {
        label: '2.5',
        value: "2.5"
    },
    {
        label: '3',
        value: "3"
    },
    {
        label: '4',
        value: "4"
    }
];

export default function PropertySearchForm({searchProperties, propertyTypes}) {
    const [cities, setCities] = useState([]);

    const search = (val) => {    
        searchProperties(val)
    }

    const { handleChange, handleSubmit, fields} = useForm(searchFields, search);

    useEffect(() => {
        const getCities = async (state) => {
            try{
                const res = await http.get(`api/cities/${state}`);
                const statesCities = await res.json();
                setCities(statesCities);
            }catch(err){
                console.log(err);
            }
        }
        if(fields.state.value.length > 0){
            getCities(fields.state.value)
        }
        
    }, [fields.state.value])

    const updatePropTypes = (evt) => {
        handleChange({
            target: 'propertyTypes',
            value: evt
        });
    }

    const updateCities = (evt) => {
        debugger;
        handleChange({
            target: 'cities',
            value: evt.map(city => city.value)
        });
    }

    const handleBathsChange = (val) => {
debugger;
        handleChange({value: val, target: 'baths'});
    };

    const handleBedsChange = (val) => {
        handleChange({value: val, target: 'beds'});
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="savedSearch">Saved Searches</label>
                <select className="form-control">
                    <option>Load a saved search...</option>
                </select>
            </div>
            <hr/>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Show Starred Listings
                </label>
            </div>
            <hr/>
            <form onSubmit={handleSubmit}>
                <PropertyTypes propertyTypes={propertyTypes} updatePropTypes={updatePropTypes} />
                <hr/>
                <ButtonGroup options={beds} label="Min. Beds" changeHandler={handleBedsChange}/>
                <ButtonGroup options={baths} label="Min. Baths" changeHandler={handleBathsChange}/>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Price
                </label>
                <div className="row">
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="min" {...fields.minPrice} handleChange={handleChange} />
                    </div>
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="max" {...fields.maxPrice} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    ARV
                </label>
                <div className="row">
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="min" {...fields.minARV} handleChange={handleChange} />
                    </div>
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="max" {...fields.maxARV} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Total Estimated Investment
                </label>
                <div className="row">
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="min" {...fields.minInvest} handleChange={handleChange} />
                    </div>
                    <div className="col-12 field-margin-bottom">
                        <MoneyInput min="0" placeholder="max" {...fields.maxInvest} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <StateDropdown {...fields.state} handleChange={handleChange} />
                {
                    fields.state.value.length > 0 && cities.length > 0 &&
                    <CitySelect cities={cities} updateCities={updateCities} />
                }
                <FormActionsWrapper>
                    <button type="submit" 
                            className="btn btn-primary float-right">Submit</button>
                </FormActionsWrapper>
            </form>
            <style jsx>{`
                hr{
                    background-color: white;
                    border-top: 2px solid rgba(0,0,0,.1);
                }
                .form-check-label{
                    font-size: 14px
                }
                .input-group-text{
                    border-radius: 0;
                    background-color: white;
                }
                .field-margin-bottom{
                    margin-bottom: 12px;
                }
            `}</style>
        </div>
    )
}