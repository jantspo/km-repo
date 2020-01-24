import Link from 'next/link';

export default function MessageAndOffersMenu({currentTab, notifications}){
    const {messages, offers, closing, aquired, noDeals} = notifications;

    return <ul className="nav nav-tabs">
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
                    Closing
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
        <style jsx>{`
            .notification{
                color: grey;
            }
            a.active .notification{
                color: white;
            }
            .nav{
                background-color: white;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px
            }
        `}</style>  
    </ul>
}