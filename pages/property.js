import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import PropertyOverview from '../components/Property/PropertyOverview';
import PropertyDetails from '../components/Property/PropertyDetails';
import {getUserId} from '../helpers/user.helper';

const property = ({fetchedProperty, zillowValue, images, assetFiles}) => {
    const [property, setProperty] = useState(fetchedProperty)
    const [files, setFiles] = useState(assetFiles);
    const [loggedIn, setLoggedIn] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    useEffect(() => {
      setUserData();
    }, [])

    const setUserData = async () => {
      const userData = window.localStorage.getItem('user');
      if(userData){
        const user = JSON.parse(userData);
        setLoggedIn(true);
        getFavoriteStatus(user.id)
      }else{
        setLoggedIn(false);
      }
    }

    const getFavoriteStatus = async (id) => {
      try{
        const res = await http.post(`api/fetch-user-favorite`, {
          user_id: id,
          asset_id: fetchedProperty.id
        });
        const favorite = await res.json();
        if(favorite){
          setFavorite(true);
          setFavoriteId(favorite.id);
        }
      }catch(err){
        console.log(err)
      }
    }

    const logout = () => {
      window.localStorage.removeItem('user');
      setLoggedIn(false);
    }

    const setAsFavorite = async () => {
      try{
        if(!favorite){
          const userId = getUserId();
          const res = await http.post(`api/user-favorites`, {asset_id: property.id, user_id: userId});
          const data = await res.json();
          setFavorite(true) 
        }else{
          const res = await http.del(`api/user-favorites/${favoriteId}`);
          const data = await res.json();
          setFavorite(false)
        }
      }catch(err){
        console.log(err);
      } 
    };
    
    return (
    <div className="register">
      <Head>
        <title>KM - Property</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <Nav updateUser={setUserData} loggedIn={loggedIn} logout={logout}/>
        {/* <PageHeader header="Properties For Sale" /> */}
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
                    <PropertyOverview image_path={property.image_path}
                                      propertyId={property.id}
                                      loggedIn={loggedIn}
                                      offers={property.offers}
                                      setFavorite={setAsFavorite}
                                      favorite={favorite}
                                      id={property.id}
                                      latitude={property.latitude}
                                      longitude={property.longitude}
                                      address={property.address}
                                      city={property.city}
                                      state={property.state}
                                      zip={property.zip}
                                      property_type={property.asset_detail.property_type}
                                      list_price={property.km_listing.list_price} 
                                      images={images} />
            </div>
            <div className="col-12 col-md-6 col-lg-8">
                    <PropertyDetails {...property} zillow={zillowValue} files={files}/>
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
            min-height:  calc(100vh - 200px);
          }
      `}</style>
    </div>
  )
}

property.getInitialProps = async ({query}) => {
    try{
        const propRes = await http.get(`api/assets/${query.id}`);
        const fetchedProperty = await propRes.json();
        const listingId = fetchedProperty.km_listing.id;
        const docRes = await http.get(`api/asset-files/${listingId}`);
        const assetFiles = await docRes.json();
        const imgRes = await http.get(`api/asset-images/${query.id}`);
        const imageFiles = await imgRes.json();
        const images = imageFiles.images;
        const zillowRes = await http.post('api/get-zillow-info', {address: fetchedProperty.address, zip: fetchedProperty.zip});
        const zillow = await zillowRes.json();
        const zillowValue = zillow.response ? zillow.response.results.result[0].zestimate[0].amount[0]._ : null;
        return {fetchedProperty, zillowValue, images, assetFiles};
    }catch(err){
        console.log(err);
    }
};

export default property
