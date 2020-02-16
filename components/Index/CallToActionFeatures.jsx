import useWindowDimensions from '../../customHooks/viewportHook';
import Carousel from 'react-bootstrap/Carousel';
import FeatureCard from './FeatureCard';

// const wholesaleStyles = `
//     .wholesale-wrapper p{
//         color: white;
//     }
//     .wholesale-wrapper h2{
//         color: white;
//     }
// `;

export default function CallToActionFeatures() {
    const { height, width } = useWindowDimensions();


    const firstCard = (
        <FeatureCard title="Search Inventory" 
                     image={{path:"/images/search-inventory.png", alt: "search inventory image"}} 
                     content="Quickly and easily search properties for sale using filters relevant to flippers like rehab budget, ARV, ROI, and more.
                        Set alerts to notify you when new properties match your criteria." 
                     />
    );
    const secondCard = (
        <FeatureCard title="Make Offer" 
                     image={{path:"/images/make-offer.png", alt: "search inventory image"}} 
                     content="Found a property? Now simply place your offer from the comfort of your connected device. All negotiations are conveniently tracked in the app." 
                     />
    );
    const thirdCard = (
        <FeatureCard title="Close Quick" 
                     image={{path:"/images/close-quick.png", alt: "search inventory image"}} 
                     content="Once we have a deal let's get it wrapped up quick so you can go to work. In most cases we'll have the deal closed in just a few days." 
                    />
    );


    const featureRow = (
        <div className='row features-row inline'>
            <div className="col-12">
                <div className="wholesale-wrapper">
                    <h2>Wholesale Direct</h2>
                    <p>Think Costco and Amazon for flippers. We buy in bulk and pass the savings to you.</p>
                </div>
               
            </div>
            <div className="col-xs-12 col-md-4">
               {firstCard}
            </div>
            <div className="col-xs-12 col-md-4">
                {secondCard}
            </div>
            <div className="col-xs-12 col-md-4" >
                {thirdCard}
            </div>
        </div>
    )

    const featureCarousel = (
        <div className='row features-row feature-carousel'>
            <div className="col-xs-12 col-md-6">
                <div className="wholesale-wrapper">
                    <h2>Wholesale Direct</h2>
                    <p>Think Costco and Amazon for flippers. We buy in bulk and pass the savings to you.</p>
                </div>
            </div>
            <div className="col-xs-12 col-md-6">
                <Carousel indicators={false} >
                    <Carousel.Item>{firstCard}</Carousel.Item>
                    <Carousel.Item>{secondCard}</Carousel.Item>
                    <Carousel.Item>{thirdCard}</Carousel.Item>
                </Carousel>
            </div>
        </div>
    )


    return (
        <div className="container">
            {featureCarousel}
            {featureRow}
            <style>{`
                 .features-row{
                    position: relative;
                    top: 35px;
                    margin-bottom: 60px;
                }

                .features-row.inline{
                    position: relative;
                    top: 0;
                    margin-top: 35px
                }

                .wholesale-wrapper p{
                    color: white;
                }
                .wholesale-wrapper h2{
                    color: white;
                }

                @media screen and (max-width: 767px) {
                    .wholesale-wrapper{
                        padding: 0 10px;
                        text-align: center
                    }
                    .container{
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .row{
                        margin-right: 0;
                        margin-left: 0;
                    }
                    .col-xs-12{
                        padding-left: 0;
                        padding-right: 0;
                    }

                    .inline{
                        display: none;
                    }
                }

                @media screen and (min-width: 768px){
                    .feature-carousel{
                        display: none;
                    }
                }
                .wholesale-wrapper p{
                    color: white;
                }
                .wholesale-wrapper h2{
                    color: white;
                }
            `}</style>
        </div>
    
        
    )
}