import Carousel from 'react-bootstrap/Carousel';

export default function PropertyImages ({close, images, image_path}) {

    return (
        <div className="card">
            <div className="card-body">
                <div className="options">
                    <button className="btn btn-danger btn-sm" onClick={close}>X</button>
                </div>
                <Carousel indicators={true} interval={null} >
                    <Carousel.Item className="property">
                        {/* <div className="main-img">

                        </div> */}
                        <img src={image_path} className="img-fluid center-block" />
                    </Carousel.Item>
                    {
                        images.map((image, ind) => {
                            const styles = {
                                backgroundImage: 'url(' + image.path + ')',
                            }
                            return <Carousel.Item key={ind} className="property">
                                {/* <div style={styles} /> */}

                              
                                <img src={image.path} className="img-fluid center-block" />
                            </Carousel.Item>
                        })
                    }
                </Carousel>
            </div>
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
                    max-height: calc(800px - 71px);
                    width: 100%;
                }

                @media screen and (max-width: 802px){
                    img{
                        max-height: calc(100vw - 71px);
                        width: 100%;
                    }
                }

                @media screen and (orientation: landscape){
                    .card{
                        width: 100vw;
                        height: 100vh;
                        padding-bottom: 32px;
                    }
                    img{
                        height: 82vh;
                        width: auto;
                    }
                }
            `}</style>
        </div>
    )
}