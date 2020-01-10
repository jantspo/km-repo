import {useState} from 'react';
import Offer from './Offer';
import http from '../../helpers/http.helper';

export default function offers ({offers, save, saved}){
    const updateValue = () => {

    }

    return <div>
        <div className="accordion" id="accordionExample">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-8">
                            Total offers: {offers.length}
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <input type="text" 
                                    formNoValidate
                                    className="form-control"
                                    id='search'
                                    value=''
                                    onChange={updateValue}
                                    aria-describedby="emailHelp" 
                                    placeholder={'Search Offers'} />
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            {
                offers.map(offer => {
                    return  <Offer offer={offer} save={save} key={offer.id} saved={saved}/>
                })
            }
        </div>
        <style jsx>{`
            .card{
                border-radius: 0;
                box-shadow: none;
            }
            
        `}</style>
    </div>
}