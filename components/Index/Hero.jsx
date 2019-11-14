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
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                }
            `}</style>
        </div>
    )
}