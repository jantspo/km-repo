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
import UserSearches from './UserSearches';

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

export default function PropertySearchForm({searchProperties, propertyTypes, saveSearchTerms, userSearches, updateTerms, fetchFavorites, loggedIn}) {
    const [cities, setCities] = useState([]);
    const [favorites, setFavorites] = useState(false);
    const search = (val) => {    
        searchProperties(val)
    }

    const { handleChange, handleSubmit, fields, getValues, checkFormNotNull, setupForm} = useForm(searchFields, search);

    useEffect(() => {
        updateTerms(getValues(fields))
    }, [fields])

    useEffect(() => {
        const getCities = async (state) => {
            if(state){
                try{
                    const res = await http.get(`api/cities/${state}`);
                    const statesCities = await res.json();
                    setCities(statesCities);
                }catch(err){
                    console.log(err);
                }
            }
        }
        if(fields.state && fields.state.value.length > 0){
            getCities(fields.state.value)
        }
        
    }, [fields.state.value])

    const updatePropTypes = (evt) => {
        handleChange({
            target: 'propertyTypes',
            value: evt
        });
    }

    const updateCities = (val) => {
        handleChange({
            target: 'cities',
            value: val
        });
    }

    const handleBathsChange = (val) => {
        handleChange({value: val, target: 'baths'});
    };

    const handleBedsChange = (val) => {
        handleChange({value: val, target: 'beds'});
    }

    const saveSearchFields = async (searchName) => {
        const params = getValues(fields);
        if(params.propertyTypes.length > 0){
            params.propertyTypes = JSON.stringify(params.propertyTypes);
        }else{
            params.propertyTypes = null;
        }
        if(params.cities.length > 0){
            params.cities = JSON.stringify(params.cities);
        }else{
            params.cities = null;
        }
        const data = {...params, name: searchName.value};
        saveSearchTerms(data);
    }

    const selectSearch = (evt) => {
        const id = evt.target.value;
        if(id == 0) {
            setupForm(null);
        }
        else{
            const data = userSearches.find(search => search.id == id);
            const formData = JSON.parse(JSON.stringify(data));
            delete formData.id;
            delete formData.createdAt;
            delete formData.updatedAt;
            delete formData.user_id;

            if(formData.propertyTypes && formData.propertyTypes.length > 0){
                formData.propertyTypes = JSON.parse(formData.propertyTypes);
            }else{
                formData.propertyTypes = [];
            }
            if(formData.cities && formData.cities.length > 0){
                formData.cities = JSON.parse(formData.cities);
            }else{
                formData.cities = [];
            }
            setupForm(formData);
        }
    }

    const handleFavoriteCheck = (evt) => {
        if(!favorites){
            setFavorites(true)
            fetchFavorites();
        }else{
            setFavorites(false);
            searchProperties();
        }   
    }

    return (
        <div className="PropertySearchForm">   
            {
                loggedIn &&
                <div>
                    <UserSearches userSearches={userSearches} 
                                  selectSearch={selectSearch} 
                                  checkFormNotNull={checkFormNotNull} 
                                  save={saveSearchFields}
                                  loggedIn={loggedIn}
                                  fields={fields}/>  
                    <hr/>
                    <div className="form-check">
                
                        <input className="form-check-input" 
                            type="checkbox" 
                            disabled={!loggedIn}
                            id="defaultCheck1"
                            onChange={handleFavoriteCheck}/>
                        <label className="form-check-label" htmlFor="defaultCheck1" >
                            Show Starred Listings
                        </label>
                    </div>
                    <hr/>
                </div>
                
            }     
          
         
  
            <form onSubmit={handleSubmit}>
                <PropertyTypes propertyTypes={propertyTypes} updatePropTypes={updatePropTypes} value={fields.propertyTypes.value} />
                <hr/>
                <ButtonGroup options={beds} label="Min. Beds" changeHandler={handleBedsChange} value={fields.beds.value}/>
                <ButtonGroup options={baths} label="Min. Baths" changeHandler={handleBathsChange} value={fields.baths.value}/>
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
                    <CitySelect cities={cities} updateCities={updateCities} {...fields.cities}/>
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