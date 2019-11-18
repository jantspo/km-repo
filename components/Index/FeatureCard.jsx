export default function FeatureCard({image, title, content}){
    return (
        <div className="card features">
            <div className="features-image-wrapper">
                <img src={image.path} alt={image.alt} className="card-img-top" />     
            </div>
            <div className="card-body">
                <h5 className="card-title" >{title}</h5>
                <p className="card-text" >{content}</p>
            </div>
            <div className="card-foot" />
            <style jsx>{`
                .features{
                    background-color:#2560A3;
                    color: white;
                    text-align: center;
                    padding-top: 30px;
                    height: 100%
                }
        
                .features .features-image-wrapper{
                    display: flex;
                    justify-content: center;
                }
        
                .features .features-image-wrapper img{
                    width: auto;
                    max-height: 75px;
                }
                .card-foot{
                    position: relative;
                    bottom: 0;
                    height: 20px;
                    background-image: linear-gradient(rgba(255, 255, 255, .5),rgba(255, 255, 255, .5));
                    background-position: top center;
                    background-size: 60% 2px;
                    background-repeat: no-repeat;
                }
            `}</style>
        </div>
    )
}