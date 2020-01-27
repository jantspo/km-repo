import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import "../public/custom.scss"
import NavLoginWrapper from './NavLoginWrapper';
import NavLogin from './NavLogin';
import http from '../helpers/http.helper';
import { getUserId } from '../helpers/user.helper';
import {useRouter} from 'next/router';
const Nav = ({loggedIn, updateUser}) => {
  const [showModal, setShowModal] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    newMessages: 0,
    newOffers: 0
  });

  const checkNotifications = async () => {
    try{
      const userId = getUserId();
      const res = await http.get(`api/getNewNotifications/${userId}`);
      const response = await res.json();
      setNotifications(response);
    }catch(err){
        console.log(err);
    }
  } 

  let notificationInterval;

  useEffect(() => {
    return () => {
      if(notificationInterval){
        window.clearInterval(notificationInterval);
      }
    }
  }, [])

  useEffect(() => {
    if(loggedIn){
      checkNotifications();
      // startNotificationChecks();
    }
    // if(loggedIn && initialLoad && !notificationInterval){
    //   setInitialLoad(false);
    //   checkNotifications();
    //   notificationInterval = setInterval(checkNotifications, 45000);
    // }
  }, [loggedIn]);

  const openLoginModal = () => {
    setShowModal(!showModal);
  }

  const handleLogin = () => {
    updateUser();
  }

  const getTooltipTitle = () => {
    let string = '';
    if(notifications.newMessages > 0 ) string = `${notifications.newMessages} Messages`;
    if(notifications.newOffers > 0 ) string = `${notifications.newOffers} Offers`;
    return string;
  }

  const logout = () => {
    window.localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="#">
              <img src="/images/nav-logo.svg" alt="Kastlemark Logo" />
          </a>
        <button className="navbar-toggler navbar-light " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="justify-content-end navbar-nav mr-auto ml-auto">
            <li>
              <Link href="properties">
                <a className="nav-link main-nav">For Sale</a>
              </Link>
            </li>
            <li>
              {
                loggedIn && 
                <Link href="my-messages">
                  <a className="nav-link main-nav">
                    {
                      notifications.newMessages > 0 ||  notifications.newOffers > 0 ?
                      <i className={`fas fa-exclamation-circle notification`} data-toggle="tooltip" data-placement="bottom" title={getTooltipTitle()} /> : ''
                    }
                    Transaction Center
                  </a>
                </Link>
              }
            </li>
            {/* <li>
              {
                loggedIn &&
                <Link href="properties">
                  <a className="nav-link main-nav">My Transactions</a>
                </Link>
              }
            
            </li> */}
            <li className="avatar-wrapper">
              {
                loggedIn ? 
                <div className="dropdown">
                  <a className="btn avatar-btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-caret-down avatar-dropdown" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <Link href='/account-settings'>
                      <a className="dropdown-item">Profile</a>
                    </Link>
                    <hr/>
                    <a className="dropdown-item" onClick={logout}>Logout</a>
                  </div>
                </div>
                : 
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                  </button>
                    <NavLoginWrapper>
                      <NavLogin handleLogin={handleLogin}/>
                    </NavLoginWrapper> 
                </div>
                // </div>
                // <Modal buttonName={'Login'}>
                //   <Login handleLogin={handleLogin}/>
                // </Modal> 
              }
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`

          a{
            cursor: pointer !important;
          }
          .navbar{
            margin-bottom: 10px
          }
          .navbar-nav{
            width: 100%;
            justify-content: space-around
          }
          .nav-item.active {
            border: 1px solid white;
          }
          @media screen and (min-width)
          .navbar-collapse{
            background-color: rgb(44, 114, 163);
            /* width: 100vw; */
            padding: 0;
            text-align: center;
            margin: 0px -16px;
        
          }

          .btn{
            border-radius: 0;
          }

          .navbar-dark .navbar-nav .nav-link{
            color: white;
          }

          .nav-link{
            color: #255FA3 !important;
          }

          .avatar-btn{
            background-color: white;
            border-radius: 20px;
            height: 40px;
            width: 40px;
            background: url(/images/nav-logo.svg) center no-repeat;
            background-size: cover;
            border: 1px solid #255FA3;
          }

          .avatar-dropdown{
            position: absolute;
            bottom: -10px;
            right: -5px;
            color: #255FA3;
            font-size: 30px;
          }
          .avatar-wrapper{
            margin-left: 20px
          }
          .dropdown-menu{
            border-radius: 0;
            left: -60px;
            box-shadow: 0px 2px 10px grey;
          }
          .notification{
            color: darkred
          }
      `}</style> 
    </div>
  )
}

export default Nav
