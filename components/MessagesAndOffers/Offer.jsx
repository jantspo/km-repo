import {useState, useEffect} from 'react';
import {getDateTime} from '../../helpers/time.helper';
import OfferResponseForm from './OfferResponseForm';

export default function Offer ({offer, save, saved}){
    const [showForm, setForm] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(saved === true){
            setForm(false);
        }
    }, [saved])

    const toggleForm = () => {
        setForm(!showForm);
    }

    const getAddress = (asset) => {
        return `${asset.address}, ${asset.city}, ${asset.state}`
    }
    const getofferBlurb = (offer) => {
        return `${offer.slice(0, 50)}...`;
    }

    const getOfferPrice = (offer) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(offer);
    }
    const closeForm = () => {
        setForm(false);
    }

    const getOfferStatus = (offer) => {
        if(offer.approved) return 'Approved';
        if(offer.declined) return 'Declined';
        return 'Pending';
    }

    const getNewMessageCount = (responses) => {
        const newResp = responses.filter(resp => {
            return resp.km_user_viewed && resp.km_user_viewed.read === false;
        })
        return newResp.length;
    }

    return  <div className="card" key={offer.id}>
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0 offer-info">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#offer-${offer.id}`} aria-expanded="true" aria-controls={offer.id}>
                            {getDateTime(offer.createdAt)} - {getAddress(offer.asset)} - <span className="offer-amount">{getOfferPrice(offer.offer)}</span> 
                        </button>
                        <div className="offer-response-info">
                            <p>Status:&nbsp; 
                                <span className={`offer-status ${offer.approved ? 'approved' : offer.declined ? 'declined' : 'pending'}`}>
                                    {
                                        getOfferStatus(offer)
                                    }
                                </span>
                            </p>
                              
                            <p>Responses: {offer.responses.length}</p>
                            <p>New: {getNewMessageCount(offer.responses)}</p>
                        </div>
                    </h2>
                </div>

                <div id={`offer-${offer.id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                        <div>
                            {offer.message}
                        </div>
                        <hr />
                        {
                            showForm ? 
                                <div>
                                    <OfferResponseForm offerId={offer.id} save={save} close={closeForm}/>
                                </div>
                            :
                
                                saved ? 
                                <div className="alert alert-primary">
                                        offer Sent!
                                </div>
                                :
                                <div className="respond-wrapper">
                                    <button className="btn btn-primary" onClick={toggleForm}>Respond</button>
                                </div>
                        }
                        <div className="responses">
                            {offer.responses.map(resp => {
                                return <div className="response" key={`response${resp.id}`}>
                                    <div className="poster">
                                        <i className="fas fa-user-circle" />&nbsp;
                                        {resp.user ?
                                            `${resp.user.first_name} ${resp.user.last_name}`
                                             :
                                            'Me'
                                        }&nbsp;&nbsp;at:&nbsp;
                                        {
                                            getDateTime(resp.createdAt)
                                        }
                                    </div>
                                   <div className="response-body">
                                    {   resp.offer &&
                                        
                                        <div>
                                            Offer: {getOfferPrice(resp.offer)}
                                        </div>
                                        
                                    }{
                                        resp.message && 
                                        <div>
                                            Comment: {resp.message}
                                        </div>
                                        
                                    }
                                   </div>
                                  
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .responses{
                        margin-top: 15px;
                    }
                    .card{
                        border-radius: 0;
                        box-shadow: none;
                        border-top: 1px solid grey;
                        border-bottom: 1px solid grey;
                        background-color: white;
                    }
                    .offer-status{
                        font-weight: 800
                    }
                    .offer-amount{
                        font-weight: 800
                    }

                    span.approved{
                        color: green
                    }

                    span.declined{
                        color: red
                    }

                    span.pending {
                        color: #2E5D95
                    }

                    .btn-link{
                        color: #2E5D95;
                        font-weight: 600;
                        text-align: start;
                    }
                    .offer-info{
                        display: flex;
                        justify-content: space-between;
                    }
                    .offer-response-info{
                        display: flex;
                        justify-content: space-between;
                    }
                    .offer-response-info p{
                        margin-right: 10px;
                    }
                    .respond-wrapper{
                        display: flex;
                        margin-top: 10px;
                        justify-content: flex-end;
                    }
                    hr{
                        border-top: 1px solid rgba(0,0,0,.5);
                    }
                    .response{
                        border-bottom: 1px solid rgba(0,0,0,.5);
                    }
                    .poster{
                        border-bottom: 1px solid rgba(0,0,0,.1);
                        padding: 10px;
                    }
                    .response-body{
                        padding: 15px;
                    }
                    @media screen and (max-width: 991px){
                        .offer-info{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        .offer-response-info{
                            justify-content: flex-end;
                        }
                    }
                `}</style>
            </div>
}