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
    }
  }, [loggedIn]);

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
        <Link href='/'>
          <a className="navbar-brand">
              <img src="/images/nav-logo.svg" alt="Kastlemark Logo" />
          </a>
        </Link>
       
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
              }
            </li>
            <li className="mobile-avatar-wrapper">
              {loggedIn &&
                <Link href='/account-settings'>
                  <a className="nav-link main-nav">Profile</a>
                </Link>
              }
            </li>
            <li className="mobile-avatar-wrapper">
              {loggedIn &&
                <a className="nav-link main-nav" onClick={logout}>Logout</a>
              }
            </li>
            <li className="mobile-avatar-wrapper">
              {!loggedIn &&
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                  </button>
                    <NavLoginWrapper>
                      <NavLogin handleLogin={handleLogin}/>
                    </NavLoginWrapper> 
                </div>
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
          @media screen and (max-width: 991px){
            .avatar-wrapper{
              display: none;
            }
          }
          @media screen and (min-width: 991px){
            .mobile-avatar-wrapper{
              display: none;
            }
          }
          @media screen and (max-width: 767px){
            .navbar-nav .dropdown-menu {
              position: relative;
              float: none;
              left: -30px;
            }
          }
            .navbar-dark .navbar-nav .nav-link{
              color: white;
            }
            .navbar-dark .navbar-toggler {
              color: #2C72A3 !important;
              border-color: #2C72A3 !important;
          }
    
          .navbar-dark .navbar-toggler-icon {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(44,114,163, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
          }
      `}</style> 
    </div>
  )
}

export default Nav
