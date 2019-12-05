import PropertySearchForm from './PropertySearchForm';

export default function PropertySearch ({children}) {
    return (
        <div>
            <div className="row mobile-search">
                <div className="col-12 justify-content-end d-flex">
                    <button className="btn btn-primary " 
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample">
                        <i className="fa fa-search"/>
                    </button>
                </div>
                <div className="col-12">
                    <div className="collapse" id="collapseExample">
                        {children}
                    </div>
                </div>
            </div>
            <div className="search">
                {children}
            </div>

            <style jsx>{`
                @media screen and (min-width: 1200px){
                    .mobile-search{
                        display: none;
                    }
                }
                @media screen and (max-width: 1199px){
                    .search{
                        display: none;
                    }
                    .mobile-search{
                        margin-bottom: 10px;
                    }
                }
            `}</style>
        </div>
    )
}