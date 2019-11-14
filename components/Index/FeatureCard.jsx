export default function FeatureCard({image, title, content}){
    return (
        <div className="card features">
            <div className="features-image-wrapper">
                <img src={image.path} alt={image.alt}/>     
            </div>
            <div className="features-text-wrapper">
                <h5>{title}</h5>
                <p>{content}</p>
            </div>
            <hr />
            <style jsx>{`
                .features{
                    background-color:#2560A3;
                    color: white;
                    padding: 30px 30px 0;
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
        
                .features-text-wrapper{
                    margin-top: 25px;
                    text-align: center;
                }
        
                .features hr{
                    border-top: 2px solid rgba(255, 255, 255, 0.43);
                }
            `}</style>
        </div>
    )
}