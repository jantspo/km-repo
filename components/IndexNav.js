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

const IndexNav = () => (
  // <nav>
  //   <ul>
  //     <li>
  //       <Link href='/'>
  //         <a>Home</a>
  //       </Link>
  //     </li>
  //     {links.map(({ key, href, label }) => (
  //       <li key={key}>
  //         <a href={href}>{label}</a>
  //       </li>
  //     ))}
  //   </ul>

  //   <style jsx>{`
  //     :global(body) {
  //       margin: 0;
  //       font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
  //         Helvetica, sans-serif;
  //     }
  //     nav {
  //       text-align: center;
  //     }
  //     ul {
  //       display: flex;
  //       justify-content: space-between;
  //     }
  //     nav > ul {
  //       padding: 4px 16px;
  //     }
  //     li {
  //       display: flex;
  //       padding: 6px 8px;
  //     }
  //     a {
  //       color: #067df7;
  //       text-decoration: none;
  //       font-size: 13px;
  //     }
  //   `}</style>
  // </nav>
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">
            <img src="/images/nav-logo.svg" alt="Kastlemark Logo" />
        </a>
      <button className="navbar-toggler navbar-light " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-primary my-2 my-sm-0" type="submit">Register</button>
        </form>
      </div>
    </nav>
  </div>
)

export default IndexNav
