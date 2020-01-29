import Link from 'next/link';

export default function MessageAndOffersMenu({currentTab, notifications}){
    const {messages, offers, closing, aquired, noDeals} = notifications;

    const getTabName = (tab) => {
        if(tab === 'messages') return 'Messages';
        if(tab === 'offers') return 'Offers';
        if(tab === 'accepted') return 'Closings';
        if(tab === 'sold') return 'Aquired';
        if(tab === 'abandoned') return 'No Deals';
    }

    return <div>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link  href="my-messages">
                    <a className={`nav-link ${currentTab== 'messages' ? 'active' : ''}`} href="#">
                        {
                            messages > 0 &&
                            <i className={`fas fa-exclamation-circle notification`} />
                        }
                        &nbsp;
                        Messages
                    </a>
                </Link>
            
            </li>
            <li className="nav-item">
                <Link  href="my-offers">
                    <a className={`nav-link ${currentTab== 'offers' ? 'active' : ''}`}>
                        {
                            offers > 0 &&
                            <i className={`fas fa-exclamation-circle notification`} />
                        }
                        &nbsp;
                        Offers
                    </a>
                </Link>
        
            </li>
            <li className="nav-item">
                <Link  href="my-closing">
                    <a className={`nav-link ${currentTab== 'accepted' ? 'active' : ''}`}>
                        {
                            closing > 0 && 
                            <i className={`fas fa-exclamation-circle notification`} />
                        }
                        &nbsp;
                        Closings
                    </a>
                </Link>
        
            </li>
            <li className="nav-item">
                <Link  href="my-acquired">
                    <a className={`nav-link ${currentTab== 'sold' ? 'active' : ''}`}>
                        {
                            aquired > 0 &&
                            <i className={`fas fa-exclamation-circle notification`} />
                        }
                        &nbsp;
                        Acquired
                    </a>
                </Link>
        
            </li>
            <li className="nav-item">
                <Link  href="my-no-deals">
                    <a className={`nav-link ${currentTab== 'abandoned' ? 'active' : ''}`}>
                        {
                            noDeals > 0 && 
                            <i className={`fas fa-exclamation-circle notification`} />
                        }
                        &nbsp;
                        No Deals
                    </a>
                </Link>
        
            </li>
        </ul>
        <div className="dropdown dropdown-nav">
            <button className="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownTabMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {getTabName(currentTab)}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownTabMenuButton">
                <Link href="my-messages">
                    <a className="dropdown-item">Messages</a>
                </Link>
                <Link href="my-offers">
                    <a className="dropdown-item" >Offers</a>
                </Link>
                <Link href="my-closing">
                    <a className="dropdown-item" >Closings</a>
                </Link>
                <Link href="my-aquired">
                    <a className="dropdown-item" >Aquired</a>
                </Link>
                <Link href="my-no-deals">
                    <a className="dropdown-item" >No Deals</a>
                </Link>
            </div>
        </div>
        <style jsx>{`
            .notification{
                color: grey;
            }
            a.active .notification{
                color: white;
            }
            .dropdown-nav{
                width: 100%;
            }
            .dropdown-nav button{
                font-size: 20px;
                width: 100%;
                border-radius: 0
            }
            .nav{
                background-color: white;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px
            }
            @media screen and (max-width: 599px){
                .nav{
                    display: none;
                }
            }
            @media screen and (min-width: 600px){
                .dropdown-nav{
                    display: none;
                }
            }
            .dropdown-menu.show {
                width: 100%;
                left: -5px !important;
                border: 1px solid rgba(0,0,0,.35);
            }

            .dropdown-item:hover {
                color: #16181b;
                text-decoration: none;
                background-color: #ccddef;
            }

            .dropdown-item{
                text-align: center;
                font-weight: 500;
                font-size: 16px;
                padding: .75rem 1.5rem;
            }
            
        `}</style>  
    </div>
}