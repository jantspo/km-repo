import MoneyFormatter from '../../helpers/moneyFormatter.helpers';
import Tooltip from '../Misc/Tooltip';
import Link from 'next/link';
import { useEffect } from 'react';
import HouseCardBody from './HouseCardBody';
import LandCardBody from './LandCardBody';

export default function PropertyCard ({address, city, state, zip, image_path, km_listing, asset_detail, id, setFavorite, favorite, offers, loggedIn}) {
    const {list_price, roi, rehab_estimate, arv, estimated_rent, estimated_profit, cap_rate } = km_listing;
    const {beds, baths, sq_ft, lot_sq_ft} = asset_detail;

    const handleFavorite = () => {
        if(favorite && favorite.length > 0){
            setFavorite({add: false, favorite_id: favorite[0].id, asset_id: id});
        }else{
            setFavorite({add: true, asset_id: id});
        }
 
    }

    const isFavorited = (favorite) => {
        return favorite && favorite.length > 0;
    }

    const getStatus = () => {
        const sold = offers.filter(offer => offer.finalized);
        if(sold.length > 0 ) return 1
        const pendings = offers.filter(offer => offer.approved)
        if(pendings.length > 0 ) return 2
    }

    const getCardType = (type) => {
        if(type === 'Vacant Lot' || type === 'Land'){
            return <LandCardBody address={address}
                                city={city} 
                                state={state} 
                                zip={zip} 
                                lot_sq_ft={lot_sq_ft} 
                                arv={arv}
                                id={id}
                                rehab_estimate={rehab_estimate}
                                estimated_rent={estimated_rent} 
                                list_price={list_price}
                                roi={roi}
                                cap_rate={cap_rate} />
        }else{
            return <HouseCardBody address={address}
                                  city={city} 
                                  state={state} 
                                  zip={zip} 
                                  beds={beds}
                                  baths={baths}
                                  sq_ft={sq_ft} 
                                  arv={arv}
                                  id={id}
                                  rehab_estimate={rehab_estimate}
                                  estimated_rent={estimated_rent} 
                                  list_price={list_price}
                                  roi={roi}
                                  cap_rate={cap_rate} />
        }
    }

    return (
        <div className="row PropertyCard">
            <div className="col-12 col-md-4 col-lg-3 property-card-image">
                
                <div className="property-image card-img-side">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{asset_detail.property_type.name}
                    </div> 
                    {
                        getStatus() === 1 ? 
                        <div className="sold-tag">Sold</div> :
                        getStatus() === 2 ? 
                        <div className="pending-tag">Pending</div> : ''
                    }
                    {   
                        loggedIn && (
                        isFavorited(favorite) ?
                        <div className="favorite favorite-selected" onClick={handleFavorite}>
                            <Tooltip position={'right'} message={'Remove from favorites'}>
                                <i className="fas fa-star selected" onClick={handleFavorite}/>
                            </Tooltip>
                        </div>
                        :
                        <div className="favorite favorite-deselected" onClick={handleFavorite}>
                            <Tooltip position={'right'} message={'Add to favorites'}>
                                <i className="fas fa-star deselected" onClick={handleFavorite}/>
                            </Tooltip>
                        </div>)
                    }
                </div>

                <div className="property-image card-img-top">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{asset_detail.property_type.name}
                    </div>
                    {
                        getStatus() === 1 ? 
                        <div className="sold-tag">Sold</div> :
                        getStatus() === 2 ? 
                        <div className="pending-tag">Pending</div> : ''
                    }
                    {   
                        loggedIn && (
                        isFavorited(favorite) ?
                        <div className="favorite favorite-selected">
                            <Tooltip position={'right'} message={'Remove from favorites'}>
                                <i className="fas fa-star selected" onClick={handleFavorite}/>
                            </Tooltip>
                        </div>
                        :
                        <div className="favorite favorite-deselected">
                            <Tooltip position={'right'} message={'Add to favorites'}>
                                <i className="fas fa-star deselected" onClick={handleFavorite}/>
                            </Tooltip>
                        </div>)
                    }
                </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9 property-card-wrapper">
                <div className="card property-card">
                    {
                        getCardType(asset_detail.property_type.name)
                    }
                </div>
            </div>
            <style jsx>{`
            .PropertyCard{
                margin-bottom: 35px;
            }
            .card{
                border-radius: 0
            }
            .fieldName{
                color: #777777;
            }
            .fieldValue{
                color: #255FA3;
                font-weight: 700
            }

            h5{
                color: #255FA3;
                font-weight: 700;
            }
            h6{
                color: #777;
            }
            .top-details{
                margin-bottom: 10px;
            }
            .sale-price{
                padding: 10px;
                background-color: #255FA3;
                left: 1.26rem;
                position: relative;
            }
            .sale-price .fieldName{
                color: white;
            }
            .sale-price .fieldValue{
                color: white;
            }
            .property-image{
                background-color: #fff;
                background: url(${image_path}) center no-repeat;
                background-size: cover;
            }
            @media screen and (min-width: 768px){
                .property-image{
                    height: 100%;
                }
                .card-img-top{
                    display: none
                }
            }

            @media screen and (max-width: 991px){
                .small-hide{
                    display: none;
                }
            }

            @media screen and (max-width: 767px){
                .card-img-side{
                    display: none
                }

                .favorite{
                    bottom: -210px;
                    left: -75px;
                }

                .property-image{
                    min-height: 260px;
                }
            }
            
            .property-card-image{
                padding: 0;
            }

            .property-card-wrapper{
                padding: 0
            }

            .subtitle span{
                border-left: 1px solid black;
                padding-left: 7px;
                padding-right: 7px;
            }
            
            .subtitle span:first-child{
                border-left: none;
                padding-left: 0;
            }

            .property-type{
                position: relative;
                top: 25px;
                left: 15px;
                display: inline-block;
                color: #efefef;
                background-color: #255FA3;
                border-radius: 20px;
                padding: 5px 10px;
            }

            .favorite{
                position: absolute;
                bottom: 20px;
                left: 15px;
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                height: 32px;
                width: 32px;   
                text-align: center;
                border-radius: 50%;
                border: 2px solid darkred;
                opacity: .8;
                box-shadow: 2px 1px 10px black;
            }
            
            .favorite-selected{
                background-color: darkred;
            }

            .favorite-deselected{
                border: 2px solid white;
                opacity: .8;
            }

            .favorite:hover{
                color: #ffff66;
            }

            .deselected{
                color: white;
                position: relative;
                top: calc(50% - 12px);
            }

            .selected{
                color: white;
                position: relative;
                top: calc(50% - 12px);
            }

            .sold-tag{
                color: white;
                /* color: #b10000; */
                background-color: darkred;
                top: 70px;
                left: 36px;
                position: relative;
                font-weight: 500;
                font-size: 43px;
                /* padding: 0px; */
                border-radius: 50px;
                text-align: center;
                transform: rotateZ(-40deg);
                width: 140px;
            }
            .pending-tag{
                background-color: #59b559;
                color: #f9f9f9;
                top: 70px;
                left: calc(50% - 100px);
                position: relative;
                font-weight: 500;
                font-size: 43px;
                border-radius: 50px;
                text-align: center;
                -webkit-transform: rotateZ(-40deg);
                -ms-transform: rotateZ(-40deg);
                transform: rotateZ(-40deg);
                width: 190px;
                border: 2px solid #59b559;
            }
        `}</style>
        </div>
           

    )
}