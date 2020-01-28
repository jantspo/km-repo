import OfferRow from './OfferRow';

export default function offers ({offers, save, saved, tab, updatePageSize, pageSize, search}){
    const updateValue = (evt) => {
        evt.persist;
        search(evt.target.value);
    }

    return <div>
        <div className="accordion" id="accordionExample">
            <div className="card">
                <div className="card-body">
                    {/* <div className="row"> */}
                        {/* <div className="col-12 col-md-6 col-lg-8">
                            Total offers: {offers.length}
                        </div> */}
                        {/* <div className="col-12">
                            <div className="form-group">
                                <input type="text" 
                                    formNoValidate
                                    className="form-control"
                                    id='search'
                                    onChange={updateValue}
                                    aria-describedby="emailHelp" 
                                    placeholder={'Search Offers'} />
                            </div>
                        </div> */}
                    {/* </div> */}
                    <div className="row">
                        <div className="col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                            <div className="form-group">
                                <label htmlFor="sortBy">Display:</label>&nbsp;&nbsp;
                                <select className="form-control" id="sortBy" value={pageSize} onChange={updatePageSize}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
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