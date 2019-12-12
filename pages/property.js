import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import PropertyOverview from '../components/Property/PropertyOverview';
import PropertyDetails from '../components/Property/PropertyDetails';

const properties = ({fetchedProperty}) => {
    const [property, setProperty] = useState(fetchedProperty)

  return (
    <div className="register">
      <Head>
        <title>KM - Property</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <Nav />
        {/* <PageHeader header="Properties For Sale" /> */}
      </div>    
      <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
                    <PropertyOverview image_path={property.image_path} list_price={'900000'} />
            </div>
            <div className="col-12 col-md-6 col-lg-8">
                    <PropertyDetails {...property}/>
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

properties.getInitialProps = async ({query}) => {
    try{
        const propRes = await http.get(`api/assets/${query.id}`);
        const fetchedProperty = await propRes.json();
        return {fetchedProperty};
    }catch(err){
        console.log(err);
    }
};

export default properties
