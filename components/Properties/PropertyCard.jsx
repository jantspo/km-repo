import MoneyFormatter from '../../helpers/moneyFormatter.helpers';
import Tooltip from '../Misc/Tooltip';
import Link from 'next/link';
export default function PropertyCard ({address, city, state, zip, image_path, km_listing, asset_detail, id, setFavorite}) {
    const {list_price, roi, rehab_estimate, arv, estimated_rent, estimated_profit, cap_rate } = km_listing;
    const {beds, baths, sq_ft} = asset_detail;

    const handleFavorite = () => {
        setFavorite(id);
    }

    return (
        <div className="row PropertyCard">
            <div className="col-12 col-md-4 col-lg-3 property-card-image">
                
                <div className="property-image card-img-side">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{asset_detail.property_type.name}
                    </div> 
                    <div className="favorite favorite-selected">
                        <Tooltip position={'right'} message={'Remove from favorites'}>
                            <i className="fas fa-star selected" onClick={handleFavorite}/>
                        </Tooltip>
                    </div>
                     {/* <div className="favorite favorite-deselected">
                        <Tooltip position={'right'} message={'Add to favorites'}>
                            <i className="fas fa-star deselected" onClick={handleFavorite}/>
                        </Tooltip>
                    </div> */}
                    {/* <Tooltip position={'right'} message={'Add to favorites'}>
                        <i className="far fa-star favorite deselected" onClick={handleFavorite}/>
                    </Tooltip>
                    <Tooltip position={'right'} message={'Remove from favorites'}>
                        <i className="fas fa-star favorite selected" onClick={handleFavorite}/>
                    </Tooltip> */}
                </div>

                <div className="property-image card-img-top">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{asset_detail.property_type.name}
                    </div>
                    <Tooltip position={'right'} message={'Add to favorites'}>
                        <i className="far fa-star favorite deselected" onClick={handleFavorite}/>
                    </Tooltip>
                    <Tooltip position={'right'} message={'Remove from favorites'}>
                        <i className="fas fa-star favorite selected" onClick={handleFavorite}/>
                    </Tooltip>
                </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9 property-card-wrapper">
                <div className="card property-card">
                    <div className="card-body">
                        <div className="card-title">
                            <h5>
                                <Link href={`property?id=${id}`}>
                                    <a>{address}, {city}, {state} {zip}</a>
                                </Link>
                                
                            </h5>
                            <h6 className="subtitle">
                                <span><i className="fas fa-bed" />&nbsp;{beds ? beds : 'N/A'}</span>
                                <span><i className="fas fa-bath" />&nbsp;{baths ? baths : 'N/A'}</span>
                                <span><i className="fas fa-vector-square" />&nbsp;{sq_ft ? sq_ft : 'N/A'}</span>
                            </h6>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">ARV</div>
                                <div className="fieldName">Estimate</div>
                                <div className="fieldValue">{MoneyFormatter(arv)}</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Fix/Flip</div>
                                <div className="fieldName">Rehab Est.</div>
                                <div className="fieldValue">{MoneyFormatter(rehab_estimate)}</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Fix/Rent</div>
                                <div className="fieldName">Rent Est.</div>
                                <div className="fieldValue">{MoneyFormatter(estimated_rent)}</div>
                            </div>
                            <div className="col-lg-3 small-hide"></div>    
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Wholsale Disc.</div>
                                <div className="fieldValue">{(100 - ((list_price / arv) * 100)).toFixed(1)}%</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">ROI</div>
                                <div className="fieldValue">{roi}%</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Cap</div>
                                <div className="fieldValue">{cap_rate}%</div>
                            </div>
                            <div className="col-5 col-md-4 col-lg-3 offset-7 offset-md-8 offset-lg-0">
                                <div className="sale-price">
                                    <div className="fieldName">List Price</div>
                                    <div className="fieldValue">{MoneyFormatter(list_price)}</div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
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
                background-color: white;
            }

            .favorite:hover{
                color: #ffff66;
            }

            .deselected{
                color: darkred;
                position: relative;
                top: calc(50% - 12px);
            }

            .selected{
                color: white;
                position: relative;
                top: calc(50% - 12px);
            }
        `}</style>
        </div>
           

    )
}