import Tooltip from '../Misc/Tooltip';
import GeneralInput from '../Inputs/GeneralInput';
import {useState, useEffect} from 'react';

export default function UserSearches ({userSearches, selectSearch, checkFormNotNull, fields, save, loggedIn}){
    const [show, setShowForm] = useState(false);
    const [searchName, setSearchName] = useState('');

    const toggleSearchSave = () => {
        setShowForm(true);
    }

    useEffect(() => {
        setShowForm(false);
        setSearchName('');
    }, [userSearches]);

    const setName = (evt) => {
        setSearchName(evt);
    }

    const cancelSave = () => {
        setSearchName('');
        setShowForm(false);
    }

    const saveSearch = () => {
        save(searchName);
    }

    return (
        <div>
            {show ? 
                <div className="form-group">
                    <div>
                        <GeneralInput fieldName="Search Name" required={true} value={searchName} handleChange={setName} target={'name'}/>
                    </div>
                    <div className="save-options">
                        <Tooltip position={'bottom'} message={'Save Search Parameters'}>
                            <button className="btn btn-primary btn-sm"
                                    disabled={searchName.length < 1} 
                                    onClick={saveSearch}>
                                <i className="far fa-save" />
                            </button>
                        </Tooltip>
                        &nbsp;
                        <Tooltip position={'bottom'} message={'Cancel'}>
                            <button className="btn btn-danger btn-sm"
                                    onClick={cancelSave}>
                                <i className="fas fa-times" />
                            </button> 
                        </Tooltip>                 
                    </div>
                </div>
            
                :
               
                    <div className="search-save">
                         <div className="form-group">
                            <label htmlFor="savedSearch">Saved Searches</label>
                            <select className="form-control" onChange={selectSearch} disabled={!loggedIn}>
                                <option value={0} >Load a saved search...</option>
                                {
                                    userSearches.map(search => {
                                        return <option key={search.id} value={search.id} >{search.name}</option>
                                    })
                                }
                            </select>
                        </div>  
                        <div className="options">
                            <Tooltip position={'right'} message={'Save Search Parameters'}>
                                <button className="btn btn-primary btn-sm" 
                                        disabled={!checkFormNotNull(fields)}
                                        onClick={toggleSearchSave}>
                                    <i className="far fa-save" />
                                </button>
                            </Tooltip>                    
                        </div>
                </div>
            }
            <style jsx>{`
                .search-save{
                    display: flex;
                }

                .search-save .options{
                    margin-top: 35px;
                    margin-left: 5px;
                }

                .save-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }

                .form-group{
                    width: 100%
                }
            `}</style>
        </div>
    )
}