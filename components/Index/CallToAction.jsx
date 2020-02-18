import CallToActionFeatures from './CallToActionFeatures';
import BeforAfterImages from './BeforeAfterImages';
import {useRouter} from 'next/router';
export default function CallToAction(){
    const router = useRouter();
    const viewAssets = () => {
        router.push('/properties')
    }

    const register = () => {
        router.push('/register')
    }

    return (
        <div className="container">
            <div className="row call-to-action">
                <div className="col-xs-12 col-md-5">
                    <h1 className='title'>Find your next Flip FAST</h1>
                    <div className="row">
                        <div className="col mobile-center" >
                            <p className='description'>
                                Spend less time huntung deals and more time flipping.
                            </p>
                            <div className="hero-actions">
                                <button className="btn btn-light" onClick={viewAssets}>VIEW ASSETS FOR SALE</button>
                                <button className="btn btn-light" onClick={register}>SIGN UP FOR FREE</button>
                            </div>
       
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-7 before-after-images">
                    <BeforAfterImages />
                </div>
                <div className="feature-wrapper" >
                    <CallToActionFeatures />
                </div>
            </div>

            <style jsx>{`
                h1 {
                    color: white;
                    font-weight: 700;
                    text-shadow: 1px 1px 10px black;
                    text-align: center;
                }

                h2{
                    color: white;
                }

                p{
                    font-size: 14px;
                    font-weight: 500;
                    color: white;
                }

                .btn{
                    color: #255fa4;
                    font-size: 14px;
                    font-weight: 700
                }

                .before-after-image{
                    max-height: 320px
                }

                @media screen and (max-width: 767px){
                    .before-after-images{
                        margin-top: 15px;
                        width: 100vw;
                        display: flex;
                        justify-content: center;
                        max-height: 380px
                    }

                    .feature-wrapper{
                        margin-top: 15px;
                        width: 100vw;
                    }

                    .mobile-center{
                        text-align: center;
                    }
                    
                }

                @media screen and (min-width: 768px) {
                    h1 {
                        color: white;
                        font-weight: 700;
                        text-shadow: 1px 1px 10px black;
                        text-align: initial;
                    }
                }

                @media screen and (max-width: 395px){
                    button{
                        margin-bottom: 10px;
                    }
                }

                .hero-actions .btn{
                    margin-right: 10px;
                }
            `}</style>
        </div>  
    )
}