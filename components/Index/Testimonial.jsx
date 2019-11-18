// image={test.image} name={test.name} company={test.company} blurb={test.content}
export default function Testimonial ({image, name, company, blurb}) {
    return (
        <div>
            <div className="content-wrapper" >
                <img src={image} alt="testimonial" className="w-100 img-fluid"/>
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
                img{
                    width: 90vw;
                    max-width: 400px
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