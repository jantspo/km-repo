import Link from 'next/link';

export default function MessageAndOffersMenu({currentTab}){
    return <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link  href="my-messages">
                <a className={`nav-link ${currentTab== 'messages' ? 'active' : ''}`} href="#">
                    <i className={`fas fa-exclamation-circle notification`} />&nbsp;
                    Messages
                </a>
            </Link>
          
        </li>
        <li className="nav-item">
            <Link  href="my-offers">
                <a className={`nav-link ${currentTab== 'offers' ? 'active' : ''}`}>
                    <i className={`fas fa-exclamation-circle notification`} />&nbsp;
                    Offers
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