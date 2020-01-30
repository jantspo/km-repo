 import money from '../../helpers/moneyFormatter.helpers';

 const getMoney = (val) => {
    const formatted = money(val);
    return formatted.substring(0, formatted.length - 3)
 }

 export default function PropertyCard({city, state, image_path, asset_detail, km_listing}){
    return (
        <div className="PropertyCard-wrapper">
            <div className="card">
                <div className="box">
                    <div className="img-container">
                        <div classNmae="dummy"></div>
                        <img src={image_path} alt="house" className="card-img-top" />

                    </div>
                </div>
                
                <div className="card-body">
                    <h5 className="card-title">{city}, {state}</h5>
                    <p>{asset_detail.beds} BED | {asset_detail.baths} BATH | {asset_detail.sq_ft} SQ FT</p>
                    <span>Projections</span>
                    <p>Flip: {getMoney(km_listing.estimated_profit)} { km_listing.cash_on_cash && <span> | {km_listing.cash_on_cash}% C on C</span>}</p>
                    <p>Rent: {getMoney(km_listing.estimated_rent)} | {km_listing.roi}% Annualized ROI</p>    
                </div>
            </div>
            <style jsx>{`
                div.card{
                    box-shadow: 1px 1px 23px black;
                    background-color: white;
                    width: 80%;
                    border-radius: 10px;
                    border: 0;
                    box-shadow: 0;
                }
                .PropertyCard-wrapper{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .card-title{
                    color: #343841;
                    margin-bottom: .25rem
                }
                p{
                    line-height: .75rem;
                    margin-bottom: .65rem;
                    color: #343841;
                    font-weight: 700;
                }
                span{
                    font-weigth: 400;
                    color: grey;
                    font-size: 14px;
                }
                p span{
                    line-height: .75rem;
                    margin-bottom: .65rem;
                    color: #343841;
                    font-weight: 700;
                    font-size: 12px;
                }
                .box{
                    width: 100%
                }
                .img-container{
                    width: 100%;
                }
                .dummy{
                    margin-top: 75%;
                }
                img{
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
                @media screen and (min-width: 640px){
                    div.card{
                        width: 40%
                    }
                }
                @media screen and (min-width: 768px) {
                    .PropertyCard-wrapper{
                        width: 33%;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    }
                    div.card{
                        width: 90%;
                    }
                }
            `}</style>
        </div>
    )
}