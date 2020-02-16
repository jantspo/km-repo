import PropertyCard from './PropertyCard';

export default function FeaturedPropertyRow ({properties}) {
    return (
        <div className="FeaturedPropertyRow" >
                {
                    properties.map(property => {
                        return <PropertyCard key={property.id} {...property} />
                    })
                }
    
            <style jsx>{`
                .FeaturedPropertyRow{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                .FeaturedPropertyRow-cards-wrapper{
                    width: 768px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                @media screen and (min-width: ){
                    .FeaturedPropertyRow-cards-wrapper{
                        width: 768px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    )
}