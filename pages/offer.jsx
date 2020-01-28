import {useState, useEffect} from 'react';
import {getDateTime} from '../helpers/time.helper';
import OfferResponseForm from '../components/MessagesAndOffers/OfferResponseForm';
import http from '../helpers/http.helper';
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Link from 'next/link';
import moneyFormat from '../helpers/moneyFormatter.helpers';
import OfferResponse from '../components/MessagesAndOffers/OfferResponse';
import {checkForNew, defaultNotifications, intervalCheckForNew, getOfferResponseCount, intervalCountCheck} from '../helpers/notifications.helpers';

const getResponses = async (id) => {
    try{
        const res = await http.get(`api/offer-responses/${id}`);
        const responses = await res.json();
        return responses;
    }catch (err){
        console.log(err);
    }
}

const getUpdatedOffer = async (id) => {
    try{
        const res = await http.get(`api/offers/${id}`);
        const initialOffer = await res.json();
        return initialOffer;
    }catch (err){
        console.log(err);
    }
}

function offer ({initialOffer, initialResponses, query}){
    const [offer, setOffer] = useState(initialOffer)
    const [loggedIn, setLoggedIn] = useState(false);
    const [showForm, setForm] = useState(false);
    const [responses, setResponses] = useState(initialResponses);
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState(defaultNotifications);
    const [count, setCount] = useState(responses.length);
    let responseInterval;
    let countInterval;

    useEffect(() => {
        if(window){
            const userData = window.localStorage.getItem('user');
            const user = JSON.parse(userData);
            const userId = user.id; 
            checkForNew(userId, setNotifications);
            countInterval = intervalCheckForNew(userId, setNotifications);
            responseInterval = intervalCountCheck(offer.id, getOfferResponseCount, setCount);
            setLoggedIn(setUserData());
        }
        setOffersRead();
        return () => {
            if(responseInterval && countInterval && window){
                window.clearInterval(responseInterval)
                window.clearInterval(countInterval)
            }
        }
    }, [])

    useEffect(() => {
        if(count > responses.length){
            getUpdatedOffer(offer.id).then(updOffer => {
                const updatedOffer = {...offer, ...updOffer};
                setOffer(updatedOffer);
            })

            
           getResponses(offer.id).then(updResp => {
                setResponses(updResp);
           
            });

        }
    }, [count])

    const setOffersRead = () => {
        let unreadResp = initialResponses.filter(resp => {
            return resp.km_user_viewed && resp.km_user_viewed.read === false;
        }).map(resp => resp.km_user_viewed.id);
        if(unreadResp.length > 0){
            return http.put(`api/read-offers`, unreadResp);
        }   
    }

    const toggleForm = () => {
        setForm(!showForm);
    }

    const getAddress = (asset) => {
        return `${asset.address}, ${asset.city}, ${asset.state}`
    }

    const closeForm = () => {
        setForm(false);
    }

    const save = async (formData) => {    
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        try{
            const data = {...formData, km_user_id: userId};
            const res = await http.post('api/offer-response', data);
            const mess = await res.json();
            const newOffers = [mess, ...responses];
            setResponses(newOffers);
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                closeForm();
            }, 2000);
        }catch(err){
            console.log(err);
        }
    }

    const updateOffer = async (data) => {    
        try{
            const res = await http.put(`api/offers/${offer.id}`, data);
            const newOffer = await res.json();

            setOffer({...offer, ...newOffer});
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                closeForm();
            }, 2000);
        }catch(err){
            console.log(err);
        }
    }

    const getOfferStatus = (offer) => {
        if(!offer.active) return 'No Deal';
        if(offer.finalized) return 'Sale Complete'
        if(offer.approved) return 'Approved';
        if(offer.km_user_approved) return 'Pending HGM Approval'
        return 'Negotiating';
    }

    const reopenOffer =() => {
        const data = {
            message: `Re-opening negotiations.`,
            thread_id: offer.id
        }
        save(data);
        updateOffer({active: true, km_user_approved: false, accepted: false});
    }

    const acceptOffer = () => {
        const data = {
            message: `Accepted offer for ${moneyFormat(offer.current_offer)}`,
            thread_id: offer.id
        }
        save(data);
        updateOffer({km_user_approved: true});
    }

    const notAccepted = () => {
        console.log(responses);
        const accepted = responses.find(resp => {
            return resp.message && resp.message.includes('Accepted offer for') && resp.km_user
        });
        if(!responses.length > 0 || accepted){
            return false
        }else{
            console.log(responses);
            const lastOffer = responses.find(resp => {
                return resp.user && resp.offer
            });
            if(!lastOffer || lastOffer.offer !== offer.current_offer ||  getOfferStatus(offer) !== 'Negotiating' ){
                return false
            }else{
                return true;
            }
        }
    }

    const getOfferClass = () => {
        if(!offer.active) return 'declined';
        if(offer.finalized) return 'approved'
        if(offer.approved) return 'accepted';
        if(offer.km_user_approved) return 'pending'
        return 'negotiating';
    }

    return (
        <div>
             <Head>
                <title>KM - Property</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className="page-wrapper">
                <Nav updateUser={setUserData} loggedIn={loggedIn}/>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <MessageAndOffersMenu currentTab={query.tab} notifications={notifications} />
                            <div className="card">
                                <div className="card-body">
                                    <div className="offer-header">
                                        <h2>
                                            <Link href={`/property?id=${offer.asset.id}`}>
                                                <a>{getAddress(offer.asset)}<i className="fas fa-external-link-alt asset-link" /></a>
                                            </Link>
                                           
                                        </h2>
                                        <h3>{getDateTime(offer.createdAt)}</h3>
                                    </div>
                                    <div className="offer-sub-header">
                                        <h5 className="offer-status accepted">Current Offer: <span className="accepted">{moneyFormat(offer.current_offer || offer.offer)}</span></h5>
                                        <div>
                                            <h5 className={`offer-status ${getOfferClass()}`}>
                                                Offer Status:&nbsp;&nbsp;&nbsp;<span>{
                                                    getOfferStatus(offer)
                                                }</span>
                                            </h5>
                                            {
                                                !offer.active &&
                                                <div className="accept-button">
                                                    <button className="btn btn-primary" onClick={reopenOffer}>Re-Open</button>
                                                </div>
                                            }
                                            {
                                                notAccepted() && 
                                                <div className="accept-button">
                                                    <button className="btn btn-primary" onClick={acceptOffer}>Accept Offer</button>
                                                </div>
                                            }
                                        </div>
                     
                                    </div>
                                   <hr/>
                                    <p>Initial Offer: {moneyFormat(offer.offer)}</p>
                                    <p>{offer.message}</p>
                                    <hr/>
                                    <h5>Responses</h5>
                                    {
                                        showForm ? 
                                            <div>
                                                <OfferResponseForm offerId={offer.id} save={save} close={closeForm}/>
                                            </div>
                                        :
                                            saved && 
                                            <div className="alert alert-primary">
                                                    offer Sent!
                                            </div>
                                    }
                                    {   !showForm && offer.active &&
                                         <div className="respond-wrapper">
                                            <button className="btn btn-primary" onClick={toggleForm}>Respond</button>
                                        </div>
                                    }
                                    {responses.map(resp => {
                                        return <OfferResponse key={resp.id} response={resp} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
            </div>
            <div className="footer-wrapper">
                <Footer />
            </div>
            <style jsx>{`
                i{
                    border: 1px solid #2E5D95;
                    border-radius: 50%;
                }
                i.asset-link{
                    border: none;
                    border-radius: none;
                    margin-left: 5px;
                    font-size: 15px
                }
                p{
                    font-size: 16px;
                }
                .response-button{
                    width: 100%;
                    display:flex;
                    justify-content: flex-end;
                }

                .card{
                    border-radius: 0;
                    box-shadow: none;
                }

                .offer-header{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }

                h2{
                    color: grey;
                    font-size: 22px;
                }

                h3{
                    color: #697077;
                    font-size: 14px;
                }

                .page-wrapper{
                    margin-bottom: 20px;
                    min-height:  calc(100vh - 200px);
                }

                .loading-spinner{
                    display: flex;
                    justify-content: center;
                }

                .respond-wrapper{
                    display: flex;
                    margin-top: 10px;
                    justify-content: flex-end;
                    margin-bottom: 10px;
                }

                @media screen and (min-width: 575px){
                    .posted-date{
                        display: flex;
                        justify-content: flex-end;
                    }
                }

                @media screen and (max-width: 656px) {
                    .offer-header{
                        flex-direction: column;
                    }

                    .offer-sub-header{
                        flex-direction: column
                    }
                }

                h5{
                    font-size: 18px;
                }

                .offer-status{
                    font-weight: 800;
                    color: #697077;
                    font-size: 14px;
                }

                .offer-amount{
                    font-weight: 800
                }

                .offer-status span{
                    font-size: 18px;
                }

                .approved span{
                    color: green;
                }

                .declined span{
                    color: darkred;
                }

                .accepted span{
                    color: #2E5D95
                }

                .pending span{
                    color: orange;
                }

                .negotiating span{
                    color: grey
                }

                .offer-sub-header{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                
                .accept-offer{
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                }

                .accept-button{
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                }
            `}</style>
        </div>
    )
}

offer.getInitialProps = async ({query}) => {
    try{
        const res = await http.get(`api/offers/${query.id}`);
        const initialOffer = await res.json();
        const respRes = await http.get(`api/offer-responses/${query.id}`);
        const initialResponses = await respRes.json();
        return {initialOffer, initialResponses, query}
    }catch(err){
        console.log(err);
        return err;
    }
}

export default offer;