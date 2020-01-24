import {useState, useEffect} from 'react';
import {getDateTime} from '../helpers/time.helper';
import MessageResponseForm from '../components/MessagesAndOffers/MessageResponseForm';
import http from '../helpers/http.helper';
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Link from 'next/link';
import {checkForNew, defaultNotifications, intervalCheckForNew, getMessageResponseCount, intervalCountCheck} from '../helpers/notifications.helpers';

const getResponses = async (id, cb) => {
    try{
        const respRes = await http.get(`api/message-responses/${id}`);
        const initialResponses = await respRes.json();
        cb(initialResponses)
    }catch (err){
        console.log(err);
    }

}

function message ({message, initialResponses}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [showForm, setForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [responses, setResponses] = useState(initialResponses);
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState(defaultNotifications);
    const [count, setCount] = useState(responses.length);
    let countInterval;
    let responseInterval;

    useEffect(() => {
        if(window){
            const userData = window.localStorage.getItem('user');
            const user = JSON.parse(userData);
            const userId = user.id; 
            checkForNew(userId, setNotifications);
            countInterval = intervalCheckForNew(userId, setNotifications);
            responseInterval = intervalCountCheck(message.id, getMessageResponseCount, setResponses);
            setLoggedIn(setUserData());
        }
        return () => {
            if(countInterval && responseInterval && window){
                window.clearInterval(countInterval);
                window.clearInterval(responseInterval);
            }
        }
    }, [])

    useEffect(() => {
        if(count > responses.length){
            getResponses(offer.id, setResponses);
        }
      }, [count])

    const toggleForm = () => {
        setForm(!showForm);
    }

    const getAddress = (asset) => {
        return `${asset.address}, ${asset.city}, ${asset.state}`
    }
    const getMessageBlurb = (message) => {
        return `${message.slice(0, 50)}...`;
    }

    const closeForm = () => {
        setForm(false);
    }

    const getNewMessageCount = (responses) => {
        const newResp = responses.filter(resp => {
            return resp.km_user_viewed && resp.km_user_viewed.read === false;
        })
        return newResp.length;
    }

    const save = async (formData) => {    
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        try{
            const data = {...formData, km_user_id: userId};
            const res = await http.post('api/message-response', data);
            const mess = await res.json();
            const newMessages = [mess, ...responses];
            setResponses(newMessages);
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                closeForm();
            }, 2000);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
             <Head>
                <title>KM - Property</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className="page-wrapper">
                <Nav updateUser={setUserData} loggedIn={loggedIn}/>
                {/* <PageHeader header="My Messages" /> */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <MessageAndOffersMenu currentTab={'messages'} notifications={notifications} />
                            <div className="card">
                                <div className="card-body">
                                    <div className="message-header">
                                        <h2>
                                            <Link href={`/property?id=${message.asset.id}`}>
                                                <a>{getAddress(message.asset)}</a>
                                            </Link>
                                           
                                        </h2>
                                        <h3>{getDateTime(message.createdAt)}</h3>
                                    </div>
                                    <p>{message.message}</p>
                                    <hr/>
                                    <h5>Responses</h5>
                                    {
                                        showForm ? 
                                            <div>
                                                <MessageResponseForm messageId={message.id} save={save} close={closeForm}/>
                                            </div>
                                        :
                            
                                            saved ? 
                                            <div className="alert alert-primary">
                                                    Message Sent!
                                            </div>
                                            :
                                            <div className="respond-wrapper">
                                                <button className="btn btn-primary" onClick={toggleForm}>Respond</button>
                                            </div>
                                    }
                                    {responses.map(resp => {
                                        return <div className="response" key={resp.id}>
                                            <div className="poster row">
                                                <div className="col-12 col-sm-6">
                                                <i className="fas fa-user-circle" />&nbsp;
                                                    {resp.user ?
                                                        `${resp.user.first_name} ${resp.user.last_name}` :
                                                        'Me'
                                                    }
                                                </div>
                                                <div className="col-12 col-sm-6 posted-date">
                                                    {
                                                        getDateTime(resp.createdAt)
                                                    }  
                                                </div>      
                                            </div>
                                            <div className="response-body">
                                                {
                                                    resp.message
                                                }
                                            </div>
                                                <hr/>
                                        </div>
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
                .message-header{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
                h2{
                    color: grey;
                    font-size: 22px;
                }
                h3{
                    color: grey;
                    font-size: 16px;
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
                .poster{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                @media screen and (min-width: 575px){
                    .posted-date{
                        display: flex;
                        justify-content: flex-end;
                    }
                }
            `}</style>
        </div>
    )
}

message.getInitialProps = async ({query}) => {
    try{
        const res = await http.get(`api/messages/${query.id}`);
        const message = await res.json();
        const respRes = await http.get(`api/message-responses/${query.id}`);
        const initialResponses = await respRes.json();
        return {message, initialResponses}
    }catch(err){
        console.log(err);
        return err;
    }
}

export default message;