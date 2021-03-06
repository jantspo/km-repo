export default function Testimonial ({image, name, company, blurb}) {
    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                    <img src={image} alt="testimonial" className=" w-100 img-fluid"/>
                </div>
            </div>
            <div className="content-wrapper" >
                <p>"{blurb}"</p>
            </div>
           
            <h4>{name}</h4>
            <h5>{company}</h5>
            <style jsx>{`
                div{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    text-align: center;
                }
                p{
                    font-style: italic;
                    textalign: center;
                    max-width: 550px;
                }
                h4{
                    font-weight: 700
                }
                .content-wrapper{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}