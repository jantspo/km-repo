import React from 'react'
import {useState, useEffect} from 'react';
import http from '../helpers/http.helper';
import {getUserId} from '../helpers/user.helper';
import OfferLayout from '../layouts/OfferLayout';
import {checkForNew, defaultNotifications, intervalCheckForNew} from '../helpers/notifications.helpers';
const fetchOffers = async (id) => {
    try{
        const res = await http.get(`api/users-offers/${id}?finalized=true`);
        const mess = await res.json();
        return mess;
    }catch(err) {
        console.log(err);
    }
}

const mySold = ({}) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [newMessages, setNewMessages] = useState(defaultNotifications.aquired);
  let countInterval;

  useEffect(() => {
    if(window){
      const userData = window.localStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id; 
      checkForNew(userId, setNotifications);
      countInterval = intervalCheckForNew(userId, setNotifications);
      
      getOffers();
     
    }
    return () => {
      if(countInterval && window){
        window.clearInterval(countInterval);
      }
    }
  }, [])

  useEffect(() => {
    if(notifications.aquired !== newMessages){
        getOffers()
    }
  }, [notifications])

  const getOffers = async () => {
      const mess = await fetchOffers(getUserId());
      setOffers(mess);
      setLoading(false);
  }
  
  return (
      <OfferLayout offers={offers} menuTab="sold" loading={loading} notifications={notifications} />
  )
}

export default mySold;
