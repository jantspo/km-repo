import MoneyInput from '../Inputs/MoneyInput';
import StateDropdown from '../Inputs/StateDropdown';
import searchFields from './searchFields';
import useForm from '../../hooks/useForm';
import FormActionsWrapper from '../Misc/FormActionsWrapper';
import PropertyTypes from './PropertyTypes';
export default function PropertySearchForm({searchProperties, propertyTypes}) {
    const search = (val) => {    
        debugger;   
        searchProperties(val)
    }

    const { handleChange, handleSubmit, fields, checkFieldValid} = useForm(searchFields, search);

    const updatePropTypes = (evt) => {
        handleChange({
            target: 'propertyTypes',
            value: evt
        });
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
                <PropertyTypes propertyTypes={propertyTypes} updatePropTypes={updatePropTypes}/>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Price
                </label>
                <div className="row">
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="min" {...fields.minPrice} handleChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="max" {...fields.maxPrice} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    ARV
                </label>
                <div className="row">
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="min" {...fields.minARV} handleChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="max" {...fields.maxARV} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Total Estimated Investment
                </label>
                <div className="row">
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="min" {...fields.minInvest} handleChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <MoneyInput min="0" placeholder="max" {...fields.maxInvest} handleChange={handleChange} />
                    </div>
                </div>
                <hr/>
                <StateDropdown {...fields.state} handleChange={handleChange} />
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
            `}</style>
        </div>
    )
}