import Carousel from 'react-bootstrap/Carousel';
import PropertyCard from './PropertyCard';

export default function FeaturedPropertiesCarousel({properties}){
    return (
        <Carousel indicators={false} interval={null} >
            {
                properties.map((property, ind) => {
                    return <Carousel.Item key={ind} >
                        <PropertyCard {...property} />
                    </Carousel.Item>
                })
            }
        </Carousel>
    )
}