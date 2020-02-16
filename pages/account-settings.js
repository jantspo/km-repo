import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import PageHeader from '../components/Misc/PageHeader';
import AccountHeader from '../components/Account/AccountHeader';
import AccountSettingsOverview from '../components/Account/AccountSettingsOverview';
import http from '../helpers/http.helper';
import Tooltip from '../components/Misc/Tooltip';
import AccountSettingsForm from '../components/Account/AccountSettingsForm';
import PasswordForm from '../components/Account/PasswordForm';
import {updateUserData } from '../helpers/user.helper';

const accountSettings = ({f}) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [saving, setSaving] =useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setUserData();
  }, []);

  const fetchUser = async () => {
    try{
        const data = window.localStorage.getItem('user');
        const parsedUser = JSON.parse(data);
        const res = await http.get(`api/users/${parsedUser.id}`);
        const userData = await res.json();
        setUser(userData);
    }catch(err){console.log(err)}
}

  const setUserData = async () => {
    const userData = window.localStorage.getItem('user');
    if(userData){
      setLoggedIn(true);
      fetchUser();
    }else{
      setLoggedIn(false);
    }
  }

  const toggleForm = () => {
      setEditing(!editing);
  }

  const togglePasswordForm = () => {
    setEditingPassword(!editingPassword);
}

  const update = async (formData) => {
    setSaving(true);
    try{
      const data = window.localStorage.getItem('user');
      const parsedUser = JSON.parse(data);
      const res = await http.put(`api/users/${parsedUser.id}`, formData);
      const updatedUser = await res.json();
      setUser(updatedUser);
      updateUserData(updatedUser);
      setTimeout(() => {
        toggleForm();
        setSaving(false);
      }, 1500);

    }catch(err){

    }
  }
  
  return (
    <div className="register">
      <Head>
        <title>KM - Account Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="page-wrapper">
        <Nav loggedIn={loggedIn} updateUser={setUserData} />
        <PageHeader header="Manage Account" />
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <AccountHeader />
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-4 avatar-wrapper">
                                  <div className="wrapper">
                                    <img src="/images/nav-logo.svg" className="img-fluid avatar" alt="Avatar Image" />
                                    <button className="btn btn-primary">Change Propfile Image</button>
                                  </div>
                                  
                                    {
                                      !editingPassword ?
                                      <div className="wrapper">
                                        <button className="btn btn-primary" onClick={togglePasswordForm}>Change Password</button>
                                      </div>
                                       :
                                      <div className="password-wrapper">
                                        <PasswordForm toggleForm={togglePasswordForm} userId={user.id} />
                                      </div>
                                    }
                                  
                              
                                  

                                </div>
                                <div className="col-12 col-md-8">
                                    <div className="account-settings-header">
                                        {
                                            !editing &&
                                            <Tooltip position="bottom" message="Edit">
                                                <button className="btn btn-warning btn-sm" onClick={toggleForm}>
                                                    <i className="far fa-edit" />
                                                </button>
                                            </Tooltip> 
                                        }
                                    </div>
                                    {
                                        editing ?
                                        <AccountSettingsForm update={update} toggleForm={toggleForm} user={user} saving={saving}/>
                                        :
                                        <AccountSettingsOverview {...user}/>
                                    }
                            
                                </div>
                            </div>
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
          .page-wrapper{
            margin-bottom: 20px;
            min-height:  calc(100vh - 200px);
          }
          .avatar-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
          .avatar{
            border: 2px solid #255FA3;
            border-radius: 145px;
            height: 175px;
            width: 175px;
            margin-bottom: 15px;
          }
          .account-settings-header{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            width: 100%;
        }
        .wrapper{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .password-wrapper{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media screen and (max-width: 767px){
          .wrapper{
            margin-bottom: 20px;
            width: 100%
          }
          .wrapper div{
            width: 100%
          }
          .password-wrapper{
            display: flex;
            flex-direction: row;
            width: 100%
          }
        }
      `}</style>
    </div>
  )
}

export default accountSettings;
