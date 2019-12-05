import MoneyFormatter from '../../helpers/moneyFormatter.helpers';

export default function PropertyCard ({address, city, state, zip, image_path, sales_info, asset_detail}) {
    const {km_sell_price, km_roi, km_rehab_estimate, km_arv, km_estimated_rent, km_coc_roi, km_estimated_profit } = sales_info;
    const {beds, baths, sq_ft} = asset_detail;

    return (
        <div className="row PropertyCard">
            <div className="col-12 col-md-4 col-lg-3 property-card-image">
                <div className="property-image"></div>
                <img src={image_path} alt="Property Image" className="card-img-top" />
            </div>
            <div className="col-12 col-md-8 col-lg-9 property-card">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h5>
                                {city}, {state}
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
                                <div className="fieldValue">{km_arv}</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Rehab Estimate</div>
                                <div className="fieldValue">{MoneyFormatter(km_rehab_estimate)}</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Rent Estimate</div>
                                <div className="fieldValue">{MoneyFormatter(km_estimated_rent)}</div>
                            </div>
                            <div className="col-lg-3 small-hide"></div>    
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Discount</div>
                                <div className="fieldValue">{km_arv}%</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Rehab ROI Estimate</div>
                                <div className="fieldValue">{km_arv}%</div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3">
                                <div className="fieldName">Rent ROI Estimate</div>
                                <div className="fieldValue">{km_arv}%</div>
                            </div>
                            <div className="col-5 col-md-4 col-lg-3 offset-7 offset-md-8 offset-lg-0">
                                <div className="sale-price">
                                    <div className="fieldName">Price</div>
                                    <div className="fieldValue">{MoneyFormatter(km_sell_price)}</div>
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
            @media screen and (min-width: 768px){
                .property-image{
                    color: #fff;
                    height: 100%;
                    background: url(${image_path}) center no-repeat;
                    background-size: cover;
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
                .property-image{
                    display: none;
                }
            }
            
            .property-card-image{
                padding: 0;
            }

            .property-card{
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
            
        `}</style>
        </div>
           

    )
}