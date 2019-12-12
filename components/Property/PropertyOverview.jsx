import Tooltip from '../Misc/Tooltip';

export default function PropertyOverview({image_path}){
    const handleFavorite = () => {}
    return (
        <div className="row">
            <div className="col-12">
                <div className="property-image card-img-top">
                    {/* <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{asset_detail.property_type.name}
                    </div> */}
                    <div className="favorite favorite-deselected">
                        {/* <Tooltip position={'right'} message={'Add to favorites'}>
                            <i className="far fa-star deselected" onClick={handleFavorite}/>
                        </Tooltip> */}
                        <Tooltip position={'right'} message={'Add to favorites'}>
                            <i className="fas fa-star deselected" onClick={handleFavorite}/>
                        </Tooltip>
                    </div>
                    <div className="favorite favorite-selected">
                        <Tooltip position={'right'} message={'Remove from favorites'}>
                            <i className="fas fa-star selected" onClick={handleFavorite}/>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card property-card">
                    <div className="card-body">
                        <p className="img-ctrl">
                            <i className="fas fa-caret-left" />&nbsp;&nbsp;
                                1 of 12
                                &nbsp;&nbsp;
                            <i className="fas fa-caret-right" />
                        </p>
                        <h5>Price</h5>
                        <p className="price">$56,000.00</p>
                        <button className="btn btn-primary contact-btn">
                            Message Seller
                        </button>
                    </div>
                </div>
            </div>
           
            <style jsx>{`
                .img-ctrl{
                    font-weight: 700;
                    color: #616161;
                }

                h5{
                    font-size: .9rem;
                    font-weight: 300;
                    color: grey;
                }

                .price{
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #616161;
                }

                .property-image{
                    min-height: 260px;
                    background-color: #fff;
                    background: url(${image_path}) center no-repeat;
                    background-size: cover;
                }

                .card-body{
                    text-align: center;
                }

                .contact-btn{
                    margin-top: 30px;
                    width: 100%
                }


                .favorite{
                    position: absolute;
                    bottom: 20px;
                    right: 30px;
                    display: inline-block;
                    font-size: 25px;
                    cursor: pointer;
                    height: 50px;
                    width: 50px;   
                    text-align: center;
                    border-radius: 50%;
                    border: 2px solid darkred;
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
                    top: calc(50% - 19px);
                }
    
                .selected{
                    color: white;
                    position: relative;
                    top: calc(50% - 19px);
                }
                
            `}</style>
        </div>
    )
}