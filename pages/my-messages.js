import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Messages from '../components/MessagesAndOffers/Messages';
import PageHeader from '../components/Misc/PageHeader';
import {checkForNew, defaultNotifications, intervalCheckForNew} from '../helpers/notifications.helpers';

const fetchMessages = async (id) => {
    try{
        const res = await http.get(`api/users-messages/${id}`);
        const mess = await res.json();
        return mess;
    }catch(err) {
        console.log(err);
    }
}

const myMessages = ({}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState(defaultNotifications);
    const [newMessages, setNewMessages] = useState(defaultNotifications.messages);
    let countInterval;

    useEffect(() => {
      if(window){
        const userData = window.localStorage.getItem('user');
        const user = JSON.parse(userData);
        const userId = user.id; 
        setLoggedIn(true);
        checkForNew(userId, setNotifications);
        countInterval = intervalCheckForNew(userId, setNotifications);
        
        getMessages();
     
      }
      return () => {
        if(countInterval && window){
          window.clearInterval(countInterval);
        }
      }
    }, [])

    useEffect(() => {
      if(notifications.messages !== newMessages){
          getMessages()
      }
    }, [notifications])

    const getMessages = async () => {
        const mess = await fetchMessages(getUserId());
        setMessages(mess);
        setLoading(false);
    }

    const save = async (formData) => {    
      const userData = window.localStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id; 
      try{
          const data = {...formData, km_user_id: userId};
          const res = await http.post('api/message-response', data);
          const mess = await res.json();
          const origThread = messages.find(message => message.id == data.thread_id);
          origThread.responses = [mess, ...origThread.responses];
          const updatedMessages = [...messages] ;
          setMessages(updatedMessages);
          setSaved(true);
          setTimeout(() => {
              setSaved(false)
          }, 2000);
      }catch(err){
          console.log(err);
      }
      
  }

    return (
    <div className="offers">
      <Head>
        <title>KM - Property</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <div className="page-wrapper">
        <Nav updateUser={setUserData} loggedIn={loggedIn}/>
        <PageHeader header="My Messages" />
        <div className="container">
            <div className="row">
                <div className="col-12">
                  <MessageAndOffersMenu currentTab={'messages'} notifications={notifications} />
                  {
                    loading ? 
                    <div className="card">
                      <div className="card-body loading-spinner">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                   :
                    <Messages messages={messages} saved={saved} save={save}/>
                  }
                </div>
            </div>
        </div>
      </div>    
    
      <div className="footer-wrapper">
        <Footer />
      </div>
      <style jsx>{`
         .card{
          border-radius: 0
        }
          .page-wrapper{
            margin-bottom: 20px;
            min-height:  calc(100vh - 200px);
          }
          .loading-spinner{
            display: flex;
            justify-content: center;
          }
      `}</style>
    </div>
  )
}

// offers.getInitialProps = async ({query}) => {
//     try{
//         const propRes = await http.get(`api/assets/${query.id}`);
//         const fetchedProperty = await propRes.json();
//         return {fetchedProperty};
//     }catch(err){
//         console.log(err);
//     }
// };

export default myMessages;
