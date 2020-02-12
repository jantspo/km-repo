import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer'
import PageHeader from '../components/Misc/PageHeader';
export default function about () {
    return <div className="register">
    <Head>
      <title>KM - About Us</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className="page-wrapper">
      <IndexNav />
      <PageHeader header="About Us" />
      <div className="container">
          <div className="row">
              <div className="col-12 col-lg-8 offset-lg-2">
                <p>
                    Our passion for real estate development and investing has led us to create a site to help with one of the main problems we see over and over. Where do I find deals? MLS? Definitely not. Marketing campaigns? They work but large investments are consistently needed to get reliable results. Brokers? With pocket listings they typically have much better deals than public sites but may not have consistent deal flow to keep your pipeline filled.
                </p>
                <p>
                    We’ve been fortunate enough to develop relationships with hedge funds, banks and note servicers who need to move bulk portfolios of properties off their balance sheets. So much so that our inventory grew beyond our capacity to rehab these properties ourselves. Which is where the idea for Kastlemark sprung up. 
                    List excess properties on a convenient, easy to use website. And how about do all the negotiation right within the app? Yep, create your account, make your offer and our app keeps track of everything. The complete history of our negotiation is saved in your account.
                </p>
                <p>
                    What about due diligence and analysis you may ask? Our goal is to make the buying process is easy for you as possible and that includes project analysis whether it’s a fix/flip or fix/rent. Proforma’s on each property project ROI for both scenarios. The same analysis we use on the properties we invest in we include for you. We include property reports and pictures too.
                </p>   
                <p>
                As our site continues to grow with properties, look for new features coming soon too such as online digital closings, remote property access and others. And if you have comments or suggestions, we always like to hear how we can improve the experience for our real estate investor community.

                </p>
              </div>
          </div>
      </div>
        
    </div>    
    <div className="footer-wrapper">
      <Footer />
    </div>
      <style jsx>{`
        .register{
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        p{
            font-size: 15px;
            color: #697077;
            // text-indent: 20px;
        }
      `}</style>
  </div>
}