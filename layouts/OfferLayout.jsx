import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Offers from '../components/MessagesAndOffers/Offers';
import PageHeader from '../components/Misc/PageHeader';

const OfferLayout = ({children, menuTab, offers, loading}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      setLoggedIn(setUserData());
    }, [])

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
                  <MessageAndOffersMenu currentTab={menuTab}/>
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
                    <Offers offers={offers} tab={menuTab} />
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

export default OfferLayout;
