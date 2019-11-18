import useWindowDimensions from '../../customHooks/viewportHook';
import {useState} from 'react';
import FeaturedPropertiesCarousel from './FeaturedPropertiesCarousel';
import FeaturedPropertiesRow from './FeaturedPropertiesRow';

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([
        {
            city: 'Fresno',
            state: 'Ca',
            beds: 4,
            baths: 2,
            sq_ft: '2000',
            flip: 20000,
            rent: 900,
            roi: '18%',
            conc: '5%',
            image: '/images/house1.png'
        },
        {
            city: 'Clovis',
            state: 'Ca',
            beds: 4,
            baths: 2,
            sq_ft: '2500',
            flip: 25000,
            rent: 900,
            roi: '18%',
            conc: '5%',
            image: '/images/house2.png'
        },
        {
            city: 'Fresno',
            state: 'Ca',
            beds: 4,
            baths: 2,
            sq_ft: '1900',
            flip: 15000,
            rent: 900,
            roi: '18%',
            conc: '5%',
            image: '/images/house3.png'
        },
    ])

    return (
        <div className="featured">
            <div className="featured-header">
                <h2>Featured Properties</h2>
            </div>
            <div className="container inline">
                <div className="row">
                    <div className="col">
                        <FeaturedPropertiesRow properties={properties} />
                    </div>
                </div>
            </div>
            <div className="featured-carousel" >
                <FeaturedPropertiesCarousel properties={properties} interval={null} />    
            </div>
            <style jsx>{`
                .featured-wrapper{
                    padding-top: 30px;
                }
            
                .featured{
                    padding-top: 30px;
                    padding-bottom: 80px;
                    background: #3481ca; /* Old browsers */
                    background: -moz-radial-gradient(center, ellipse cover,  #3481ca 40%,#317cbf 40%,#317cbf 50%,#317cbf 70%,#2d6db4 70%,#2d6db4 80%,#2d6db4 90%,#2560a3 90%); /* FF3.6-15 */
                    background: -webkit-radial-gradient(center, ellipse cover,  #3481ca 40%,#317cbf 40%,#317cbf 50%,#317cbf 70%,#2d6db4 70%,#2d6db4 80%,#2d6db4 90%,#2560a3 90%); /* Chrome10-25,Safari5.1-6 */
                    background: radial-gradient(ellipse at center,#3481ca 40%,#317cbf 40%,#317cbf 50%,#317cbf 70%,#2d6db4 70%,#2d6db4 80%,#2d6db4 90%,#2560a3 90%)
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3481ca', endColorstr='#2560a3',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }

                .featured-header{
                    display: flex;
                    justify-content: center;
                    margin-bottom: 15px;
                }

                h2{
                    color: white;
                    font-weight: 700;
                    background-image: linear-gradient(white,white);
                    background-position: bottom center;
                    background-size: 50% 3px;
                    background-repeat: no-repeat;
                    padding-bottom: 10px;
                }

                @media screen and (max-width: 767px) {
                    .inline{
                        display: none;
                    }
                }

                @media screen and (min-width: 768px) {
                    .featured-carousel{
                        display: none;
                    }
                }
            `}</style>
        </div>

    )
}