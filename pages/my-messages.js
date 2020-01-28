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
import Pagination from '../components/Misc/Pagination';

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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [filteredMessages, setFilteredMessages] = useState(messages.slice(page - 1, pageSize));
    const [totalPages, setTotalPages] = useState(Math.ceil(messages.length / pageSize));

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

    useEffect(()=> {
      const mess = messages.slice(page - 1, pageSize);
      setFilteredMessages(mess);
      const pages = Math.ceil(messages.length / pageSize);
      setTotalPages(pages);
    }, [messages]) 

    useEffect(() => {
      filterMessages();
    }, [page])

    useEffect(() => {
      const pageTotal = Math.ceil(messages.length / pageSize);
      if(pageTotal > 0){
        setTotalPages(pageTotal);
        if(pageTotal < page){
          setPage(pageTotal);
        }
        filterMessages();
      }
   
    }, [pageSize])

    const filterMessages = () => {
      const mess = messages.slice((page * pageSize) - pageSize, page * pageSize);
      setFilteredMessages(mess);
    }

    const updatePageSize = (evt) => {
      evt.persist()
      setPageSize(evt.target.value);
    }

    const changePage = (val) => {
      if(val !== page){
        setPage(val);
      }
    }

    const pageUp = () => {
      if(page !== totalPages){
        const newPage = page + 1
        setPage(newPage);
      }
    }

    const pageDown = () => {
      if(page !== 1){
        const newPage = page - 1
        setPage(newPage);
      }
    }

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
                    <Messages messages={filteredMessages} saved={saved} save={save} updatePageSize={updatePageSize} pageSize={pageSize} />
                  }
                    <div className="card pagination-wrapper">
                      <div className="card-body">
                        <Pagination updatePage={changePage}
                                pageDown={pageDown} 
                                page={page}
                                totalPages={totalPages}
                                pageUp={pageUp} />
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
          .pagination-wrapper{
            box-shadow: 0px 18px 18px rgba(0, 0, 0, 0.25)
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
