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
  console.log(initialProperties)
    const [properties, setProperties] = useState(initialProperties)
    const [count, setCount] = useState(initialCount)
    const [time, setTime] = useState(initialTime);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(Math.ceil(count / 20));
    const [searchTerms, setSearchTerms] = useState({});
    const propertyCards = properties.map(prop => {
        return (
            <PropertyCard key={prop.id} {...prop} />
        )
    });

    const search = async (val) => {
      try{
        if(val){
          setSearchTerms(val)
        }
        const query = {page: page, pageSize: pageSize, ...val};
        const res = await http.post('api/assets', query);
        const props = await res.json();
        setProperties(props);
      }catch(err){
        debugger;
      }
    }

    const updatePageSize = (val) => {
      setPageSize(val);
    }

    const changePage = async (val) => {
      try{
        if(val !== page){
          setPage(val);
          search();
        }
      }catch (err) {

      }
    }

    const pageUp = async() => {
      try{
        if(page !== totalPages){
          setPage(page++);
          search();
        }
      }catch (err) {

      }
    }

    const pageDown = async() => {
      try{
        if(page !== 1){
          setPage(page--);
          search();
        }
      }catch (err) {

      }
    }

  return (
    <div className="register">
      <Head>
        <title>KM - Properties</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <Nav />
        <PageHeader header="Properties For Sale" />
        <div className="container">
            <div className="row">
                <div className="col-12 col-xl-3">
                    <PropertySearch>
                        <PropertySearchForm searchProperties={search} propertyTypes={propertyTypes} />
                    </PropertySearch>
                </div>
                <div className="col-12 col-xl-9">
                    {
                      properties.length > 0 ?
                      <PropertyList count={count} time={time} pageSize={pageSize} updatePages={updatePageSize} >
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
        const propTypeRes = await http.get('api/property-types');
        const propertyTypes = await propTypeRes.json();
        console.log(propertyTypes);
        const countRes = await http.post('api/asset-count');
        const initialCount = await countRes.json();
        const initialTime = (new Date().getTime() - requestStart) / 1000.0;
        return {initialProperties, initialCount, initialTime, propertyTypes};
    }catch(err){
        console.log(err);
    }
};

export default properties
