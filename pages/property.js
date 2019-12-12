import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import PropertyOverview from '../components/Property/PropertyOverview';
import PropertyDetails from '../components/Property/PropertyDetails';

const properties = ({fetchedProperty, zillowValue}) => {
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
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
                    <PropertyOverview image_path={property.image_path} list_price={'900000'} />
            </div>
            <div className="col-12 col-md-6 col-lg-8">
                    <PropertyDetails {...property} zillow={zillowValue}/>
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

properties.getInitialProps = async ({query}) => {
    try{
        const propRes = await http.get(`api/assets/${query.id}`);
        const fetchedProperty = await propRes.json();
        const zillowRes = await http.post('api/get-zillow-info', {address: fetchedProperty.address, zip: fetchedProperty.zip});
        const zillow = await zillowRes.json();
        const zillowValue = zillow.response ? zillow.response.results.result[0].zestimate[0].amount[0]._ : null;
        return {fetchedProperty, zillowValue};
    }catch(err){
        console.log(err);
    }
};

export default properties
