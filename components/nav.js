import React from 'react'
import Link from 'next/link'
import "../public/custom.scss"

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
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
            <Link href="properties">
              <a className="nav-link main-nav">My Transactions</a>
            </Link>
          </li>
          <li className="avatar-wrapper">
            <div className="dropdown">
              <a className="btn avatar-btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-caret-down avatar-dropdown" />
              </a>


              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link href='/account-settings'>
                  <a className="dropdown-item">Profile</a>
                </Link>
                
                {/* <a className="dropdown-item" href="#">Another action</a> */}
                {/* <a className="dropdown-item" href="#">Logout</a> */}
              </div>
            </div>
            
          </li>
        </ul>
      </div>
    </nav>
    <style jsx>{`
        .navbar{
          margin-bottom: 40px
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
    `}</style> 
  </div>
)

export default Nav
