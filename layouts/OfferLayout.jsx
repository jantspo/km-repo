import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import {setUserData, getUserId} from '../helpers/user.helper';
import MessageAndOffersMenu from '../components/MessagesAndOffers/MessageAndOffersMenu';
import Offers from '../components/MessagesAndOffers/Offers';
import PageHeader from '../components/Misc/PageHeader';
import Pagination from '../components/Misc/Pagination';

const OfferLayout = ({menuTab, offers, loading, notifications}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [filteredOffers, setFilteredOffers] = useState(offers.slice(page - 1, pageSize));
    const [totalPages, setTotalPages] = useState(Math.ceil(offers.length / pageSize));

    useEffect(()=> {
      const offs = offers.slice(page - 1, pageSize);
      setFilteredOffers(offs);
      const pages = Math.ceil(offers.length / pageSize);
      setTotalPages(pages);
    }, [offers]) 

    const updatePageSize = (evt) => {
      evt.persist()
      setPageSize(evt.target.value);
    }

    useEffect(() => {
      filterOffers();
    }, [page])

    useEffect(() => {
      const pageTotal = Math.ceil(offers.length / pageSize);
      setTotalPages(pageTotal);
      filterOffers();
    }, [pageSize])

    const filterOffers = () => {
      const offs = offers.slice((page * pageSize) - pageSize, page * pageSize);
      setFilteredOffers(offs);
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
      setLoggedIn(setUserData());
    }, [])

    const search = (val) => {
      debugger;

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
                  <MessageAndOffersMenu currentTab={menuTab} notifications={notifications}/>
                  {/* <div className="form-group">
                    <label htmlFor="sortBy">Display:</label>&nbsp;&nbsp;
                    <select className="form-control" id="sortBy" value={pageSize} onChange={updatePageSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                  </div> */}
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
                    <Offers offers={filteredOffers} tab={menuTab} updatePageSize={updatePageSize} pageSize={pageSize} search={search}  />
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

export default OfferLayout;
