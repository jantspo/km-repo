import MoneyFormatter from '../../helpers/moneyFormatter.helpers';

export default function PropertyDetails ({address, city, state, zip, asset_detail, km_listing}) {
    const {beds, baths, sq_ft, lot_sq_ft, built_year, property_type, county} = asset_detail;
    const {
            arv, 
            appraisal_value,
            cap_rate,
            rehab_estimate, 
            expense_per, 
            list_price, 
            holding_exp,
            selling_exp, 
            estimated_profit,
            roi,
            total_cost,
            rent_total_cost,
            estimated_rent,
            equity
         } = km_listing;

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <h1>{address}, {city}, {state} {zip}</h1>
            </div>
            <div className="col-12 col-lg-6">
                <h3>Seller Comments</h3>
            </div>
            <div className="col-12 col-lg-6">
               
                <h2 className="right"><span>Property Details</span></h2>
                <div className="details">
                    <p className="detail-label">
                        Property Value:
                    </p>
                    <p className="detail-value">
                        {MoneyFormatter(appraisal_value)}
                    </p>
                </div>
                <div className="details">
                    <p className="detail-label">
                        Property Type: 
                    </p>
                    <p className="detail-value">
                        {property_type.name}
                    </p>
                </div>
                <div className="details">
                    <p className="detail-label">
                        Street Address:
                    </p>
                    <p className="detail-value">{address}</p>
                </div>
                <div className="details">
                    <p className="detail-label">
                        City
                    </p>
                    <p className="detail-value">{city}</p>
                </div>
                <div className="details">
                    <p className="detail-label">
                        State
                    </p>
                    <p className="detail-value">{state}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Zip</p>
                    <p className="detail-value">{zip}</p>
                </div>
                <div className="details">
                    <p className="detail-label">County</p>
                    <p className="detail-value">{county}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Year Built</p>
                    <p className="detail-value">{built_year}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Floor Size Sq. Ft.</p>
                    <p className="detail-value">{sq_ft}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Lot Size Sq. Ft.</p>
                    <p className="detail-value">{lot_sq_ft}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Bedrooms</p>
                    <p className="detail-value">{beds}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Bathrooms</p>
                    <p className="detail-value">{baths}</p>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <h2><span>Financial Analysis</span></h2>
                <h4>Fix/Flip</h4>
                <div className="details">
                    <p className="detail-label">Purchase Price</p>
                    <p className="detail-value">{MoneyFormatter(total_cost)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Rehab</p>
                    <p className="detail-value">{MoneyFormatter(rehab_estimate)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Holding</p>
                    <p className="detail-value">{MoneyFormatter(holding_exp)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Selling</p>
                    <p className="detail-value">{selling_exp}%</p>
                </div>
                <div className="details">
                    <p className="detail-label">ARV</p>
                    <p className="detail-value">{MoneyFormatter(arv)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Profit</p>
                    <p className="detail-value">{MoneyFormatter(estimated_profit)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">ROI</p>
                    <p className="detail-value">{roi}%</p>
                </div>
                <h4 className="margin-top-5">Fix/Rent</h4>
                <div className="details">
                    <p className="detail-label">Total Cost</p>
                    <p className="detail-value">{MoneyFormatter(rent_total_cost)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Rent(mth)</p>
                    <p className="detail-value">{MoneyFormatter(estimated_rent)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">Cap Rate</p>
                    <p className="detail-value">{cap_rate}%</p>
                </div>
                <div className="details">
                    <p className="detail-label">Equity</p>
                    <p className="detail-value">{MoneyFormatter(equity)}</p>
                </div>
                <div className="details">
                    <p className="detail-label">
                        Estimates only. Your results may very.
                    </p>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <h3 className="files">
                    Provided Files
                </h3>
            </div>
            <div className="col-12 col-lg-6">
                <h3 className="files">Zillow</h3>
            </div>
            <style jsx>{`
                h1{
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #697077;
                }
                h2{
                    margin-top: 40px;
                    margin-bottom: 15px;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #697077;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                h2 span {
                    margin-right: 15px;
                }
                h2:after {
                    background: #2E5D95;
                    height: 1px;
                    flex: 1;
                    content: '';
                }
                h3{
                    font-size: 1rem;
                    font-weight: 700;
                    color: #697077;
                }
                h3.files{
                    margin-top: 40px;
                    margin-bottom: 15px;
                   
                }
                h4{
                    font-size: 14px;
                    font-weight: 700;
                    color: #697077;
                }

                .details{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                .details p {
                    margin-bottom: 0;
                    font-size: 14px;
                }
                .detail-label{
                    color: #91979e;
                }
                .detail-value{
                    color: #697077;
                    font-weight: 700;
                }
            `}</style>
        </div>
    )
}