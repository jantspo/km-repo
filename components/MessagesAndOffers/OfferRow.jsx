import {getDate} from '../../helpers/time.helper';
import {useRouter } from 'next/router';

export default function OfferRow ({offer, tab}){
    const router = useRouter();

    const getAddress = (asset) => {
        return `${asset.address}, ${asset.city}, ${asset.state}`
    }

    const getOfferPrice = (offer) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(offer);
    }

    const getNewofferCount = (responses) => {
        const newResp = responses.filter(resp => {
            return resp.km_user_viewed && resp.km_user_viewed.read === false;
        })
        return newResp.length;
    }

    const select = () => {
        let route = `/offer?id=${offer.id}`;
        if(tab) route = `${route}&tab=${tab}`;
        router.push(route);
     }

    return (
        <div className="offer-row" onClick={select}>
            <div className="row">
                <div className="col-3 col-lg-2">
                    {getDate(offer.createdAt)}
                </div>
                <div className="col-5 col-lg-3 order-lg-3">
                    <div className="offer-response-info">
                            <p>Responses: {offer.responses.length}</p>
                            <p>New: {getNewofferCount(offer.responses)}</p>
                        </div>
                </div>
                <div className="col-8 col-lg-5">
                    {getAddress(offer.asset)}
                </div>
                <div className="col-4 col-lg-2">
                    <div className="offer-price">
                        {getOfferPrice(offer.current_offer || offer.offer)}
                    </div>
                </div>
              
            </div>
            <style jsx>{`
                    .offer-row{
                        background-color: white;
                        padding: 10px 15px;
                        border-bottom: 1px solid darkgrey;
                    }
                    .offer-row:hover{
                        background-color: #2E5D95;
                        color: white;
                        cursor: pointer;
                    }

                    .offer-price{
                        font-weight: 700;
                        color: #2E5D95;
                    }

                    .offer-row:hover span.approved, .offer-row:hover span.declined, .offer-row:hover span.pending, .offer-row:hover .offer-price {
                        color: white
                    }

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
                        justify-content: flex-end;
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
                        border-top: 1px solid rgba(0,0,0,.5);
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
                        .offer-price{
                            width: 100%;
                            display: flex;
                            justify-content: flex-end;
                        }
                        .offer-status{
                            width: 100%;
                            display: flex;
                            justify-content: center;
                        }
                    }
                    .offer-status{
                        font-weight: 800
                    }
                    .offer-amount{
                        font-weight: 800
                    }    
                  
                `}</style>
        </div>
    )
}