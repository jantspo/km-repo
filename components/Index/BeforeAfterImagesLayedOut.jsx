export default function BeforeAfterImagesLayedOut(){
    return (
        <div className="images-wrapper">
            <img src="/images/before-after.png" alt=""/>
            {/* <img src="/images/BeforeAfter1.png" alt="Before and After Rennovation"/>
            <img src="/images/BeforeAfter2.png" alt="Before and After Rennovation"/>
            <img src="/images/BeforeAfter3.png" alt="Before and After Rennovation"/> */}
            <style jsx>{`
                .images-wrapper img{
                    width: 100%;
                    height: auto;
                    min-height: 100%
                    background: rgb(46,76,110);
                    background: radial-gradient(circle,rgba(46,76,110,0.6) 100%,rgba(46,76,110,1) 100%);
                    -webkit-box-shadow: 0px 0px 50px 0px #2e4c6e;
                    box-shadow: 0px 0px 80px 16px rgba(46,76,110,1);
                }
                .images-wrapper{
                    // background: rgb(255,255,255);
                    // background: radial-gradient(circle, rgba(255,255,255,1) 39%, rgba(51,130,200,1) 98%);
                    // box-shadow: 0 0 13px 2px #FFF, 0 0 40px 2px #b3d7ff, 0 0 231px 40px #004085;
                }
                .images-wrapper:first-child{
                    position: relative;
                    top: -25px
                }
                .images-wrapper:nth-child(2){
                    position: relative;
                    left: -15px;
                    top: 25px
                }
                @media screen and (max-width: 767px){
                    .images-wrapper{
                        display: none;
                    }
                }
  
            `}</style>
        </div>
    )
} 