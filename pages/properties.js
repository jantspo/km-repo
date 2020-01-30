import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import PropertySearch from '../components/Properties/PropertySearch';
import PropertyCard from '../components/Properties/PropertyCard';
import PropertyList from '../components/Properties/PropertyList';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import PropertySearchForm from '../components/Properties/PropertySearchForm';
import Pagination from '../components/Misc/Pagination';

const properties = ({initialProperties, initialCount, initialTime, propertyTypes}) => {
    const [properties, setProperties] = useState(initialProperties)
    const [count, setCount] = useState(initialCount)
    const [time, setTime] = useState(initialTime);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(count / 20));
    const [searchTerms, setSearchTerms] = useState({});
    const [userSearches, setUserSearches] = useState([]);
    const [sortOrder, setSortOrder] = useState({by: 'createdAt', dir: 'DESC'});
    const [loggedIn, setLoggedIn] = useState(false);

    const setUserData = async () => {
      const userData = window.localStorage.getItem('user');
      if(userData){
        const user = JSON.parse(userData);
        const userId = user.id;
        setLoggedIn(true);
        try{
          const res = await http.get(`api/user-searches/${userId}`);
          const searches = await res.json();
          setUserSearches(searches);
         
        }catch(err) {
          console.log(err);
        }
      }else{
        setLoggedIn(false);
      }
    }

    const logout = () => {
      window.localStorage.removeItem('user');
      setLoggedIn(false);
    }

    useEffect(() => {
      setUserData();
    }, []);

    useEffect(() => {
      search();
    }, [sortOrder]);

    useEffect(() => {
      search();
    }, [page])

    useEffect(() => {
      console.log(pageSize);
      search();
      const pages = Math.ceil(count / pageSize);
      setTotalPages(pages);
    },[pageSize]);

    const getUserId = () => {
      const userData = window.localStorage.getItem('user');
      const user = JSON.parse(userData);
      return user.id;
    }

    const setFavorite = async (fav) => {
      const updatedProperties = [...properties];
      const prop = properties.find(property => property.id == fav.asset_id);
      try{
        if(fav.add){
          const userId = getUserId();
          const res = await http.post(`api/user-favorites`, {asset_id: fav.asset_id, user_id: userId});
          const data = await res.json();
          prop.favorite.push(data); 
        }else{
          const res = await http.del(`api/user-favorites/${fav.favorite_id}`);
          const data = await res.json();
          prop.favorite = [];
        }
        setProperties(updatedProperties);
      }catch(err){
        console.log(err);
      } 
    };
    
    const propertyCards = properties.map(prop => {
        return (
            <PropertyCard key={prop.id} {...prop} setFavorite={setFavorite} offers={prop.offers} loggedIn={loggedIn}/>
        )
    });

    const search = async (val) => {
      const requestStart = new Date().getTime();
      try{
        const userData = window.localStorage.getItem('user');

        const query = {page: page, pageSize: pageSize, ...searchTerms, order: sortOrder};
        if(userData){
          const user = JSON.parse(userData);
          const userId = user.id;
           query.userId = userId
        }
        debugger;
        const res = await http.post('api/assets', query);
        const props = await res.json();
        const countRes = await http.post('api/asset-count', query);
        const totalCount = await countRes.json();
        setProperties(props);
        const initialTime = (new Date().getTime() - requestStart) / 1000.0;
        setCount(totalCount);
        setTotalPages(Math.ceil(totalCount / 20));
        setTime(initialTime);
      }catch(err){
        console.log(err);      
      }
    }

    const updatePageSize = (val) => {
      setPageSize(val);
    }

    const changePage = async (val) => {
      try{
        if(val !== page){
          setPage(val);
        }
      }catch (err) {

      }
    }

    const pageUp = async() => {
      try{
        if(page !== totalPages){
          const newPage = page + 1;
          setPage(newPage);
        }
      }catch (err) {

      }
    }

    const pageDown = async() => {
      try{
        if(page !== 1){
          const newPage = page - 1
          setPage(newPage);
        }
      }catch (err) {

      }
    }

    const saveSearchTerms = async (data) => {
      const userData = window.localStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;
      data.user_id = userId;
      try{
        const res = await http.post('api/user-searches', data);
        const newSearch = await res.json();
        const searches = [...userSearches, newSearch];
        setUserSearches(searches);
      }catch(err){
        console.log(err);
      } 
    }

    const updateOrder = (val) => {
      setSortOrder(val);
    }

    const updateTerms = (val) => {
      setSearchTerms(val)
    }

  const fetchFavorites = async () => {
    const userData = window.localStorage.getItem('user');
    const user = JSON.parse(userData);
    const userId = user.id;
    try{
      const query = {page: page, pageSize: pageSize, ...searchTerms, userId: userId, order: sortOrder, user_id: userId};
        const res = await http.post(`api/fetch-user-favorites`, query);
        const properties = await res.json();
        setProperties(properties);
    }catch(err){
        console.log(err)
    }
  }

  const updateUserStatus = () => {
    debugger;
    setUserData();
  }

  return (
    <div className="register">
      <Head>
        <title>KM - Properties</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <Nav loggedIn={loggedIn} updateUser={setUserData} logout={logout}/>
        <PageHeader header="Properties For Sale" />
        <div className="container">
            <div className="row">
                <div className="col-12 col-xl-3">
                    <PropertySearch>
                        <PropertySearchForm searchProperties={search}
                                            loggedIn={loggedIn}
                                            propertyTypes={propertyTypes}
                                            updateTerms={updateTerms}
                                            fetchFavorites={fetchFavorites}
                                            saveSearchTerms={saveSearchTerms} 
                                            userSearches={userSearches}/>
                    </PropertySearch>
                </div>
                <div className="col-12 col-xl-9">
                    {
                      properties.length > 0 ?
                      <PropertyList count={count} 
                                    time={time} 
                                    pageSize={pageSize}
                                    updateOrder={updateOrder} 
                                    updatePages={updatePageSize} >
                        {propertyCards}
                        <Pagination updatePage={changePage}
                                    pageDown={pageDown} 
                                    page={page}
                                    totalPages={totalPages}
                                    pageUp={pageUp} />
                      </PropertyList> :
                      'No results found.'
                    }
                   
                </div>
            </div>
        </div>
      </div>    
      <div className="footer-wrapper">
        <Footer />
      </div>
      <style jsx>{`
          .page-wrapper{
            margin-bottom: 20px;
          }
      `}</style>
    </div>
  )
}

properties.getInitialProps = async () => {
    try{
        const requestStart = new Date().getTime();
        const propRes = await http.post('api/assets', {page: 1, pageSize: 20});
        const initialProperties = await propRes.json();
        // const initialProperties = [];
        const propTypeRes = await http.get('api/property-types');
        const propertyTypes = await propTypeRes.json();
        const countRes = await http.post('api/asset-count');
        const initialCount = await countRes.json();
        const initialTime = (new Date().getTime() - requestStart) / 1000.0;
        return {initialProperties, initialCount, initialTime, propertyTypes};
    }catch(err){
        console.log(err);
    }
};

export default properties
