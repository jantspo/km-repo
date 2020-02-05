import MoneyFormatter from '../../helpers/moneyFormatter.helpers';
import Link from 'next/link';

export default function HouseCardBody ({id, 
    address, 
    city, 
    state, 
    zip,
    beds,
    baths,
    sq_ft, 
    arv, 
    rehab_estimate, 
    estimated_rent, 
    list_price, 
    roi,
    cap_rate
}){
    return (
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
                    <span><i className="fas fa-vector-square" />&nbsp;{sq_ft ? `${sq_ft} sq. ft.` : 'N/A'}</span>
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
                    <div className="fieldValue">{list_price && arv ? `${(100 - ((list_price / arv) * 100)).toFixed(1)}%` : 'N/A'}</div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="fieldName">ROI</div>
                    <div className="fieldValue">{roi ? `${roi}%` : 'N/A'}</div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="fieldName">Cap</div>
                    <div className="fieldValue">{cap_rate ? `${cap_rate}%` : 'N/A'}</div>
                </div>
                <div className="col-5 col-md-4 col-lg-3 offset-7 offset-md-8 offset-lg-0">
                    <div className="sale-price">
                        <div className="fieldName">List Price</div>
                        <div className="fieldValue">{MoneyFormatter(list_price)}</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
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