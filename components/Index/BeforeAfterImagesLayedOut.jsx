export default function BeforeAfterImagesLayedOut(){
    return (
        <div className="images-wrapper">
            <img src="/images/before-after.png" alt="Before and after images"/>
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