import BeforeAfteImagesCarousel from './BeforeAfterImagesCarousel';
import BeforeAfteImagesLayedOut from './BeforeAfterImagesLayedOut';

export default function CallToActionFeatures() {
    return (
        <div>
            <BeforeAfteImagesLayedOut />
            <BeforeAfteImagesCarousel images={["/images/BeforeAfter1.png", "/images/BeforeAfter2.png", "/images/BeforeAfter3.png"]} />
            <style jsx>{`
                .images-wrapper{
                    display: flex;
                    justify-content: space-between;
                }
                 
                @media and (max-width: 767px){
                    div{
                        width: 100vw;
                    }
                }
            `}</style>
        </div>
    
        
    )
}