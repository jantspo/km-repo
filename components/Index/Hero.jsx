export default function Hero({children}){
    return (
        <div className="landing">
            <div className='hero'>
                {children}
            </div>
            <style jsx>{`
                .hero{
                    background-color: white;
                    background-image: url(/images/callToAction-bg.png);
                    background-position: center;
                }
                .inset-shadow{
                    // -moz-box-shadow:    inset 0 0 10px #000000;
                    // -webkit-box-shadow: inset 0 0 10px #000000;
                    // box-shadow:         inset 0 0 10px #000000;
                }
                .landing{
                    // -moz-box-shadow:    inset 0 0 10px #000000;
                    // -webkit-box-shadow: inset 0 0 10px #000000;
                    // box-shadow:         inset 0 0 10px #000000;
                    background-color: #fff;
                }
                @media screen and (min-width: 768px) {
                    .hero{
                        background-position: top;
                        background-repeat: no-repeat;
                        background-size: 100vw 640px;
                    }
                }

                @media screen and (min-width: 992px) {
                    .hero{
                        background-position: top;
                        background-repeat: no-repeat;
                        background-size: 100vw 710px;
                    }
                }

                @media screen and (min-width: 1200px){
                    .hero{
                        background-position: top;
                        background-repeat: no-repeat;
                        background-size: 100vw 778px;
                    }
                }
            `}</style>
        </div>
    )
}