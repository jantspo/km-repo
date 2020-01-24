import {getDateTime} from '../../helpers/time.helper';
import moneyFormat from '../../helpers/moneyFormatter.helpers';

export default function Offerresponseonse ({response}){
    return (
        <div className="response">
            <div className="poster">
                <div className="post-user">
                    <i className="fas fa-user-circle" />&nbsp;
                    {response.user ?
                        `${response.user.first_name} ${response.user.last_name}` :
                        'Me'
                    }
                </div>
                <div className="posted-date">
                    {
                        getDateTime(response.createdAt)
                    }  
                </div>      
            </div>
            <div className="response-body">
                {
                    response.offer &&
                    <p className="response-offer">
                        New Offer: <span>{moneyFormat(response.offer)}</span>
                    </p>
                }
                
                <p>
                    {response.message}
                </p>                       
            </div>
            <hr/>
            <style jsx>{`
                .poster{
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    color: #697077;
                }
                .posted-date{
                    font-size: 12px;
                    color: #697077;
                    padding-left: 20px;
                }
                @media screen and (min-width: 468px){
                    .poster{
                        display: flex;
                        width: 100%;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .posted-date{
                        padding-left: 0
                    }
                }
                .response-offer{
                    margin-top: 10px;
                    font-weight: 500;
                    font-size: 14px;
                    color: #697077;
                }
                .response-offer span{
                    font-weight: 700;
                    font-size: 16px;
                    color: #2E5D95;
                }
                .response-body{
                    padding-left: 20px;
                }
            `}</style>
        </div>
    )
}