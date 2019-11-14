export default function BeforeAfterImagesLayedOut(){
    return (
        <div className="images-wrapper">
            <img src="/images/BeforeAfter1.png" alt="Before and After Rennovation"/>
            <img src="/images/BeforeAfter2.png" alt="Before and After Rennovation"/>
            <img src="/images/BeforeAfter3.png" alt="Before and After Rennovation"/>
            <style jsx>{`
                .images-wrapper{
                    display: flex;
                    justify-content: space-between;
                }
                .images-wrapper img{
                    box-shadow: 0 0 13px 2px #FFF, 0 0 40px 2px #b3d7ff, 0 0 231px 40px #004085;
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
            `}</style>
        </div>
    )
} 