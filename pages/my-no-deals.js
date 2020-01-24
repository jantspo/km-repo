import React from 'react'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import {setUserData, getUserId} from '../helpers/user.helper';
import OfferLayout from '../layouts/OfferLayout';

const fetchOffers = async (id) => {
    try{
        const res = await http.get(`api/users-offers/${id}?active=false`);
        const mess = await res.json();
        return mess;
    }catch(err) {
        console.log(err);
    }
}

const myAbandoned = ({}) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOffers();
  }, [])

  const getOffers = async () => {
      const mess = await fetchOffers(getUserId());
      setOffers(mess);
      setLoading(false);
  }
  
  return (
      <OfferLayout offers={offers} menuTab="abandoned" loading={loading} />
  )
}

export default myAbandoned;
