import MoneyFormatter from '../../helpers/moneyFormatter.helpers';

export default function PropertyDetails ({address, city, state, zip, asset_detail, km_listing, zillow, county, files}) {
    const {beds, baths, sq_ft, lot_sq_ft, built_year, property_type} = asset_detail;
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

    const providedFiles = files.map(file => {
        return <div className="details" key={file.id}>
            <div className="detail-value">
                <a href={file.document.path} target="_blank">
                    {file.type}
                </a>
            </div>
            <div className="detail-label">
                {new Intl.DateTimeFormat('en-US').format(new Date(file.createdAt))}
            </div>
            <style jsx>{`
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
    });     
        
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
                    <p className="detail-value">{selling_exp * 100}%</p>
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
                    <p className="detail-label">Expense</p>
                    <p className="detail-value">{expense_per}%</p>
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
                {
                    files.length > 0 ? 
                    providedFiles :
                    <div className="file-disclaimer" >
                        <i className="fas fa-exclamation-circle" />&nbsp;&nbsp;
                        <p className="no-files-disclaimer">
                            No Files provided for this property.
                        </p>
                    </div>
                    
                }
            </div>
            <div className="col-12 col-lg-6">
                <h3 className="files">Zillow</h3>
                <div className="details">
                    <div className="detail-label">
                        Zestimate
                    </div>
                    <div className="detail-value">
                        {zillow ? MoneyFormatter(zillow) : 'N/A'}
                    </div>
                </div>
                <div className="details">
                    <div className="detail-label"></div>
                    <div className="detail-value">
                        <img src="http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" 
                             width="200" 
                             height="50" 
                             alt="Zillow Real Estate Search" 
                             id="yui_3_18_1_1_1576172822330_68" />
                    </div>
                </div>
                <div className="details">
                    <div className="detail-label"></div>
                    <div className="detail-value">
                        <p className="zillow-text">
                            © Zillow, Inc., 2006-2016. 
                        </p>
                    </div>
                </div>
                <div className="details">
                    <div className="detail-label"></div>
                    <div className="detail-value">
                        <p className="zillow-text">
                            Use is subject to <a href="https://www.zillow.com/corp/Terms.htm" target="_blank">Terms of Use</a>
                        </p>   
                    </div>
                </div>
                <div className="details">
                    <div className="detail-label"></div>
                    <div className="detail-value">
                        <a target="_blank" href="https://www.zillow.com/zestimate/" className="zillow-text">What's a Zestimate?</a>
                    </div>
                </div>
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
                .zfoot-logo-full, .znav-logo-full, .znav-logo-mobile {
                    color: #006aff;
                }
                .zillow-text{
                    font-size: 12px
                }
                .file-disclaimer{
                    display: flex;
                    flex-direction: row;
                    color: #255FA3;
                }
            `}</style>
        </div>
    )
}