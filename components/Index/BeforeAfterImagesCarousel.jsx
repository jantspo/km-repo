import {useState } from 'react';

export default function BeforeAfterImagesCarousel (){
    const [images, setImages] = useState([
        {
            path: "/images/BeforeAfter1.png",
            active: false,
            ref:"1",
            position: 'left'
        },
        {
            path: "/images/BeforeAfter2.png",
            active: true,
            ref:"2",
            position: 'center'
        },
        {
            path: "/images/BeforeAfter3.png",
            active: false,
            ref:"3",
            position: 'right'
        }
    ])

    return (
        <div className="BeforeAfterImagesCarousel">
            {
                images.map(image => {
                    return <img src={image.path} 
                                alt="Before and After Rennovation"
                                id={image.ref}
                                key={image.ref}
                                className={`grow ${image.position} ${image.active && 'active'}`} />
                })
            }
            <style jsx>{`
                @media screen and (max-width: 479px){
                    div{
                        width: 100vw;
                    }
                    div img.left{
                        display: none
                    }

                    div img.right{
                        display: none
                    }

                    div img.active{
                        height: 325px; 
                    }

                    img{
                        height: 275px;
                        z-index: 3;
                    }
                }

                @media screen and (min-width: 480px){
                    div{
                        width: 100vw;
                    }

                    div img.left{
                        position: relative;
                        margin-top: 15px;
                        z-index: 2;
                        top: 20px;
                        height: 325px
                    }

                    div img.right{
                        position: relative;
                        z-index: 2;
                        top: -686px;
                        height: 325px;
                    }

                    div img.center{
                        top: -330px;
                    }
                }

                @media screen and (min-width: 768px){
                    .BeforeAfterImagesCarousel{
                        display: none;
                    }
                }

                div img.active{
                    z-index: 15 !important;
                }

                div img.center{
                    position: relative;
                    margin: 0 auto;
                }

                div img.left{
                    position: relative;
                    z-index: 2;
                    margin-right: auto;
                }

                div img.right{
                    position: relative;
                    z-index: 2;
                    margin-left: auto;
                }

                div img{
                    display:block;
                }
                
                .grow { transition: all .2s ease-in-out; }
            `}</style>
        </div>
    )
}