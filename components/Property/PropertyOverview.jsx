import Tooltip from '../Misc/Tooltip';
import {useState, useEffect} from 'react';
import MoneyFormatter from '../../helpers/moneyFormatter.helpers';
import QuickNegotiation from './QuickNegotiationForm';
import MessageForm from './MessageForm';

const filterImages = (main, imgArr) => {
    const arr = [main];
    imgArr.forEach(img => {
        if(img.path !== main){
            arr.push(img.path);
        }
    });
    return arr;
}

export default function PropertyOverview({id, image_path, property_type, images, list_price, propertyId, loggedIn, offers, favorite, setFavorite}){
    const [imagePaths, setImagePaths] = useState(filterImages(image_path, images));
    const [currentImageInd, setCurrentImageInd] = useState(0);
    const [messaging, setMessaging] = useState(false);
    const [offer, setOffer] = useState(false);

    const changeHandler = (evt) => {
        const dir = evt.target.dataset.direction;
        if(dir === 'right'){
            let newInd = currentImageInd + 1;
            if(currentImageInd === imagePaths.length -1) newInd = 0
            setCurrentImageInd(newInd);
        }else{
            let newInd = currentImageInd - 1;
            if(newInd < 0) newInd = imagePaths.length - 1;
            setCurrentImageInd(newInd);
        }
    };

    const toggleMessaging = () => {
        setMessaging(!messaging);
    }

    const toggleOffer = () => {
        setOffer(!offer);
    }

    const getStatus = () => {
        const sold = offers.filter(offer => offer.finalized);
        if(sold.length > 0 ) return 1
        const pendings = offers.filter(offer => offer.approved)
        if(pendings.length > 0 ) return 2
    }

    const handleFavorite = () => {
       setFavorite();   
    }

    const isFavorited = (favorite) => {
        return favorite
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="property-image card-img-top">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{property_type.name}
                    </div>
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
                    {
                        getStatus() === 1 ? 
                        <div className="sold-tag">Sold</div> :
                        getStatus() === 2 ? 
                        <div className="pending-tag">Pending</div> : ''
                    }
                </div>
            </div>
            <div className="col-12">
                <div className="card property-card">
                    <div className="card-body">
                        <p className="img-ctrl">
                            <i className="fas fa-caret-left img-ctrl-left" onClick={changeHandler} data-direction="left" />&nbsp;&nbsp;
                                {currentImageInd + 1} of {imagePaths.length}
                                &nbsp;&nbsp;
                            <i className="fas fa-caret-right img-ctrl-right" onClick={changeHandler} data-direction="right" />

                        </p>
                        <h5>Price</h5>
                        <p className="price">{MoneyFormatter(list_price)}</p>
                        {
                            getStatus() !== 1 && getStatus() !== 2 &&
                            
                                (offer ?
                                    <QuickNegotiation close={toggleOffer} propertyId={propertyId}/>
                                :
                                <button className="btn btn-primary contact-btn" onClick={toggleOffer} disabled={!loggedIn}>
                                    Make Offer
                                </button>)
                        }
                        {
                            getStatus() !== 1 && getStatus() == 2 &&
                            
                                (offer ?
                                    <QuickNegotiation close={toggleOffer} propertyId={propertyId}/>
                                :
                                <button className="btn btn-primary contact-btn" onClick={toggleOffer} disabled={!loggedIn}>
                                    Make Backup Offer
                                </button>)  
                        }
                        {
                            getStatus() == 1 &&
                            <p className="alert alert-danger">Not currently taking offers on this property</p>   
                        }
                        
                        {    
                            messaging &&
                                <MessageForm close={toggleMessaging} propertyId={propertyId}/>
                        }
                  
                        <div className="row">
                      
                            <div className="col-4">
                                <div className={loggedIn ? 'action-button' : 'action-button-disabled'} onClick={toggleMessaging}>
                                    <div className="action-button-title">
                                        <span>Message</span>
                                    </div>
                                    <div className="action-button-icon">
                                        <i className="far fa-envelope actions"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="action-button">
                                    <div className="action-button-title">
                                        <span>Map View</span>
                                    </div>
                                    <div className="action-button-icon">
                                        <i className="fas fa-map-marked actions" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="action-button">
                                    <div className="action-button-title">
                                        <span>Photos</span>
                                    </div>
                                    <div className="action-button-icon">
                                        <i className="fas fa-camera actions" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
           
            <style jsx>{`
                .img-ctrl{
                    font-weight: 700;
                    color: #616161;
                }

                .img-ctrl-right, .img-ctrl-left{
                    cursor: pointer;
                    transform: scale(1.5)
                }
             
                .img-ctrl-right:hover, .img-ctrl-left:hover{
                    cursor: pointer;
                    transform: scale()
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
                    background: url(${imagePaths[currentImageInd]}) center no-repeat;
                    background-size: cover;
                }

                .card-body{
                    text-align: center;
                }

                .contact-btn{
                    margin-top: 30px;
                    margin-bottom: 20px;
                    width: 100%
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
                    left: 30px;
                    display: inline-block;
                    font-size: 25px;
                    cursor: pointer;
                    height: 50px;
                    width: 50px;   
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
                    top: calc(50% - 19px);
                }
    
                .selected{
                    color: white;
                    position: relative;
                    top: calc(50% - 19px);
                }
                .action-button{
                    cursor: pointer;
                    border: 1px solid #255FA3;
                }

                .action-button:hover{
                    background-color: #255FA3;
                }

                .action-button-title{
                    width: 100%;
                    padding: 2px 5px;
                    font-size: 12px;
                    border-bottom: 1px solid #255FA3;
                }

                .action-button:hover .action-button-title{
                    border-bottom: 1px solid #fff;
                    color: white;
                }
              
                .actions{
                    font-size: 30px;
                    color: #255FA3;
                }

                .action-button:hover .actions{
                    color: white;
                }

                .action-button-icon{
                    padding: 5px;
                }    
                
                .action-button-disabled{
                    border: 1px solid grey;
                }

                .action-button-disabled .action-button-icon{
                    color: grey
                }

                .action-button-disabled .action-button-icon .actions{
                    color: grey
                }

                .action-button-disabled .action-button-title{
                    color: grey;
                    border-bottom: 1px solid grey;
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