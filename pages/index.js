import React from 'react'
import Head from 'next/head'
import IndexNav from '../components/IndexNav'
import CallToAction from '../components/Index/CallToAction';

import FeaturedProperties from '../components/Index/FeaturedProperties';
import Footer from '../components/Footer'
import InfoBoxes from '../components/Index/InfoBoxes';
import Hero from '../components/Index/Hero';
const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero>
          <IndexNav />
          <CallToAction />
      </Hero>
      <InfoBoxes />
      <FeaturedProperties />
      <Footer />
      <style jsx>{`
     
        .wholesale-wrapper{
          color: white;
          padding: 0 30px 0;
        }
      `}</style>
    </div>
  )
}

export default Home
