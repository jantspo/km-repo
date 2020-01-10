import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Offers from '../components/MessagesAndOffers/Offers';
import PageHeader from '../components/Misc/PageHeader';

const fetchOffers = async (id) => {
    try{
        const res = await http.get(`api/users-offers/${id}`);
        const mess = await res.json();
        return mess;
    }catch(err) {
        console.log(err);
    }
}

const myoffers = ({}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [offers, setOffers] = useState([]);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoggedIn(setUserData());
      getOffers();
    }, [])

    const getOffers = async () => {
        const mess = await fetchOffers(getUserId());
        setOffers(mess);
        setLoading(false);
    }

    const save = async (formData) => {    
      const userData = window.localStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id; 
      try{
          const data = {...formData, km_user_id: userId};
          const res = await http.post('api/offer-response', data);
          const mess = await res.json();
          const origThread = offers.find(offer => offer.id == data.thread_id);
          origThread.responses = [mess, ...origThread.responses];
          const updatedoffers = [...offers] ;
          setoffers(updatedoffers);
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
        <PageHeader header="My Offers" />
        <div className="container">
            <div className="row">
                <div className="col-12">
                  <MessageAndOffersMenu currentTab={'offers'}/>
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
                    <Offers offers={offers} saved={saved} save={save}/>
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

export default myoffers;
