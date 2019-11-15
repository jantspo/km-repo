import React from 'react'
import Link from 'next/link'
import "../public/custom.scss"
// import "../node_modules/jquery/dist/jquery.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const IndexNav = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">
            <img src="/images/nav-logo.svg" alt="Kastlemark Logo" />
        </a>
      <button className="navbar-toggler navbar-light " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">For Sale<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Blog<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact<span className="sr-only">(current)</span></a>
          </li>
        </ul>
        <form className="form-inline justify-content-end">
          <button className="btn btn-primary my-2 my-sm-0" type="submit">Register</button>
        </form>
      </div>
    </nav>
    <style jsx>{`
        .navbar{
          margin-bottom: 40px
        }
        .navbar-nav{
          width: 80%;
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
        .navbar-dark .navbar-nav .nav-link{
          color: white;
        }
    `}</style> 
  </div>
)

export default IndexNav
