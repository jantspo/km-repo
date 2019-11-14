export default function Hero({children}){
    return (
        <div className="landing">
            <div className='hero'>
            <div className="inset-shadow">
                {children}
            </div>  
            </div>
            <style jsx>{`
                .hero{
                    background-color: black;
                    background-image: url('/images/callToAction-bg.svg');
                    background-position: center;
                }
                .inset-shadow{
                    -moz-box-shadow:    inset 0 0 10px #000000;
                    -webkit-box-shadow: inset 0 0 10px #000000;
                    box-shadow:         inset 0 0 10px #000000;
                }
                .landing{
                    -moz-box-shadow:    inset 0 0 10px #000000;
                    -webkit-box-shadow: inset 0 0 10px #000000;
                    box-shadow:         inset 0 0 10px #000000;
                }
            `}</style>
        </div>
    )
}