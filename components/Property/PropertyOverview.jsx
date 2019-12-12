import Tooltip from '../Misc/Tooltip';
import {useState, useEffect} from 'react';

const filterImages = (main, imgArr) => {
    const arr = [main];
    imgArr.forEach(img => {
        if(img.path !== main){
            arr.push(img.path);
        }
    });
    return arr;
}

export default function PropertyOverview({image_path, property_type, images}){
    const [imagePaths, setImagePaths] = useState(filterImages(image_path, images));
    const [currentImageInd, setCurrentImageInd] = useState(0);

    const handleFavorite = () => {}

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

    console.log(currentImageInd);

    return (
        <div className="row">
            <div className="col-12">
                <div className="property-image card-img-top">
                    <div className="property-type">
                        <i className="fas fa-home" />&nbsp;&nbsp;{property_type.name}
                    </div>
                    {/* <div className="favorite favorite-deselected">
                        <Tooltip position={'right'} message={'Add to favorites'}>
                            <i className="fas fa-star deselected" onClick={handleFavorite}/>
                        </Tooltip>
                    </div> */}
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
                            <i className="fas fa-caret-left img-ctrl-left" onClick={changeHandler} data-direction="left" />&nbsp;&nbsp;
                                {currentImageInd + 1} of {imagePaths.length}
                                &nbsp;&nbsp;
                            <i className="fas fa-caret-right img-ctrl-right" onClick={changeHandler} data-direction="right" />
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

                .img-ctrl-right, .img-ctrl-left{
                    cursor: pointer;
                    transform: scale(1.5)
                }
             
                .img-ctrl-right:hover, .img-ctrl-left:hover{
                    cursor: pointer;
                    transform: scale(2)
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
                
            `}</style>
        </div>
    )
}