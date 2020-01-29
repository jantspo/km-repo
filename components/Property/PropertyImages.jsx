import Carousel from 'react-bootstrap/Carousel';

export default function PropertyMap ({close, images, image_path}) {

    debugger;
    return (
        <div className="card">
            <div className="card-body">
                <div className="options">
                    <button className="btn btn-danger" onClick={close}>X</button>
                </div>
            </div>

            <Carousel indicators={true} interval={null} >
                <Carousel.Item>
                    <img src={image_path} />
                </Carousel.Item>
                {
                    images.map((image, ind) => {
                        return <Carousel.Item key={ind} >
                            <img src={image.path} />
                        </Carousel.Item>
                    })
                }
            </Carousel>
            

            <style jsx>{`
                .card{
                    width: 100vw;
                    height: 100vw;
                    max-width: 800px;
                    max-height: 800px;
                    min-height: 320px;
                    padding-bottom: 32px;
                }
             
                .options{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    margin-bottom: 5px;
                }

                img{
                    width: 100%;
                }
            `}</style>
        </div>
    )
}