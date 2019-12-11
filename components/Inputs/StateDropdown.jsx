
import {useState, useEffect} from 'react';
import http from '../../helpers/http.helper';

const states = [
    {
        "id": 1,
        "name": "Alaska",
        "abbrev": "AK"
    },
    {
        "id": 2,
        "name": "Alabama",
        "abbrev": "AL"
    },
    {
        "id": 4,
        "name": "Arizona",
        "abbrev": "AZ"
    },
    {
        "id": 5,
        "name": "Arkansas",
        "abbrev": "AR"
    },
    {
        "id": 6,
        "name": "California",
        "abbrev": "CA"
    },
    {
        "id": 7,
        "name": "Colorado",
        "abbrev": "CO"
    },
    {
        "id": 8,
        "name": "Connecticut",
        "abbrev": "CT"
    },
    {
        "id": 9,
        "name": "Delaware",
        "abbrev": "DE"
    },
    {
        "id": 10,
        "name": "District of Columbia",
        "abbrev": "DC"
    },
    {
        "id": 12,
        "name": "Florida",
        "abbrev": "FL"
    },
    {
        "id": 13,
        "name": "Georgia",
        "abbrev": "GA"
    },
    // {
    //     "id": 14,
    //     "name": "Guam",
    //     "abbrev": "GU"
    // },
    {
        "id": 15,
        "name": "Hawaii",
        "abbrev": "HI"
    },
    {
        "id": 16,
        "name": "Idaho",
        "abbrev": "ID"
    },
    {
        "id": 17,
        "name": "Illinois",
        "abbrev": "IL"
    },
    {
        "id": 18,
        "name": "Indiana",
        "abbrev": "IN"
    },
    {
        "id": 19,
        "name": "Iowa",
        "abbrev": "IA"
    },
    {
        "id": 20,
        "name": "Kansas",
        "abbrev": "KS"
    },
    {
        "id": 21,
        "name": "Kentucky",
        "abbrev": "KY"
    },
    {
        "id": 22,
        "name": "Louisiana",
        "abbrev": "LA"
    },
    {
        "id": 23,
        "name": "Maine",
        "abbrev": "ME"
    },
    {
        "id": 25,
        "name": "Maryland",
        "abbrev": "MD"
    },
    {
        "id": 26,
        "name": "Massachusetts",
        "abbrev": "MA"
    },
    {
        "id": 27,
        "name": "Michigan",
        "abbrev": "MI"
    },
    {
        "id": 28,
        "name": "Minnesota",
        "abbrev": "MN"
    },
    {
        "id": 29,
        "name": "Mississippi",
        "abbrev": "MS"
    },
    {
        "id": 30,
        "name": "Missouri",
        "abbrev": "MO"
    },
    {
        "id": 31,
        "name": "Montana",
        "abbrev": "MT"
    },
    {
        "id": 32,
        "name": "Nebraska",
        "abbrev": "NE"
    },
    {
        "id": 33,
        "name": "Nevada",
        "abbrev": "NV"
    },
    {
        "id": 34,
        "name": "New Hampshire",
        "abbrev": "NH"
    },
    {
        "id": 35,
        "name": "New Jersey",
        "abbrev": "NJ"
    },
    {
        "id": 36,
        "name": "New Mexico",
        "abbrev": "NM"
    },
    {
        "id": 37,
        "name": "New York",
        "abbrev": "NY"
    },
    {
        "id": 38,
        "name": "North Carolina",
        "abbrev": "NC"
    },
    {
        "id": 39,
        "name": "North Dakota",
        "abbrev": "ND"
    },
    {
        "id": 41,
        "name": "Ohio",
        "abbrev": "OH"
    },
    {
        "id": 42,
        "name": "Oklahoma",
        "abbrev": "OK"
    },
    {
        "id": 43,
        "name": "Oregon",
        "abbrev": "OR"
    },
    {
        "id": 45,
        "name": "Pennsylvania",
        "abbrev": "PA"
    },
    // {
    //     "id": 46,
    //     "name": "Puerto Rico",
    //     "abbrev": "PR"
    // },
    {
        "id": 47,
        "name": "Rhode Island",
        "abbrev": "RI"
    },
    {
        "id": 48,
        "name": "South Carolina",
        "abbrev": "SC"
    },
    {
        "id": 49,
        "name": "South Dakota",
        "abbrev": "SD"
    },
    {
        "id": 50,
        "name": "Tennessee",
        "abbrev": "TN"
    },
    {
        "id": 51,
        "name": "Texas",
        "abbrev": "TX"
    },
    {
        "id": 52,
        "name": "Utah",
        "abbrev": "UT"
    },
    {
        "id": 53,
        "name": "Vermont",
        "abbrev": "VT"
    },
    // {
    //     "id": 54,
    //     "name": "Virgin Islands",
    //     "abbrev": "VI"
    // },
    {
        "id": 55,
        "name": "Virginia",
        "abbrev": "VA"
    },
    {
        "id": 56,
        "name": "Washington",
        "abbrev": "WA"
    },
    {
        "id": 57,
        "name": "West Virginia",
        "abbrev": "WV"
    },
    {
        "id": 58,
        "name": "Wisconsin",
        "abbrev": "WI"
    },
    {
        "id": 59,
        "name": "Wyoming",
        "abbrev": "WY"
    }
];

export default function GeneralInput({fieldName, required, value, handleChange, target, errors, valid, validate, placeholder}) {
    const title = fieldName || '';
    const [defaultValue, setValue] = useState(value);
    const [stateOptions, setStateOptions] = useState(states);

    useEffect(() => {
        const fetchStates = async () => {
            try{
                const res = await http.get(`api/states`);
                const stateRes = await res.json();
                const stateOpts = states.filter((el) => {
                    return stateRes.some((f) => {
                      return f.state === el.abbrev;
                    });
                  });
                setStateOptions(stateOpts);
            }catch(err){
                console.log(err)
            }
        }
        fetchStates();
    }, [])

    const updateValue = (evt) => {
        setValue(evt.target.value);
        handleChange({
            target: target,
            value: evt.target.value
        });
    }

    const checkValidation = () => {
        if(validate){
            validate(target)
        }
    }
    return (
        <div className="form-group">
            <label htmlFor={title}>{title}{required && <span>*</span>}</label>
            <select className="form-control" 
                    formNoValidate 
                    id={title}
                    value={defaultValue}
                    onBlur={checkValidation}
                    onChange={updateValue}
                    aria-describedby="emailHelp">
                <option value={''}>Select..</option>
                {
                    stateOptions.map(state => {
                    return <option key={state.id} value={state.abbrev}>{state.name}</option>   
                    })
                }
            </select>
            {
                !valid && 
                errors.length > 0 && 
                errors.map(err => {
                    return <p key={err} className="err-msg" >{err}</p>
                })
            }
            <style jsx>{`
                span{
                    color: red
                }
            `}</style>
        </div>
    )
}