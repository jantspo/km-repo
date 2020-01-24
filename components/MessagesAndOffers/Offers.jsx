import {useState} from 'react';
import OfferRow from './OfferRow';
import http from '../../helpers/http.helper';

export default function offers ({offers, save, saved, tab}){
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
                    return  <OfferRow offer={offer} key={offer.id} saved={saved} tab={tab} />
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