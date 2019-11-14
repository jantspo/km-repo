import useWindowDimensions from '../../customHooks/viewportHook';
import BeforeAfteImagesCarousel from './BeforeAfterImagesCarousel';
import BeforeAfteImagesLayedOut from './BeforeAfterImagesLayedOut';

export default function CallToActionFeatures() {
    const { height, width } = useWindowDimensions();

    // const imagesLayout = (
    //     <BeforeAfteImagesLayedOut />
    // )

    const imagesLayout = (
        <BeforeAfteImagesLayedOut />
    )

    const imagesCarousel = (
        <BeforeAfteImagesCarousel images={["/images/BeforeAfter1.png", "/images/BeforeAfter2.png", "/images/BeforeAfter3.png"]} />
    )


    return (
        <div>
            {   
                width > 767 ?
                imagesLayout :
                imagesCarousel
            }
            <style jsx>{`
                div{
                    width: 100vw;
                }
                 .images-wrapper{
                     display: flex;
                     justify-content: space-between;
                 }
                 .images-wrapper img{
                    box-shadow:
                    0 0 60px 30px #fff,  /* inner white */
                    0 0 100px 60px #f0f, /* middle magenta */
                    0 0 140px 90px #0ff; /* outer cyan */
                 }
                 .images-wrapper:first-child{
                    position: relative;
                    top: -25px
                }
                img{
                    width: 100%;
                    height: auto
                }
            `}</style>
        </div>
    
        
    )
}