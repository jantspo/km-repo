export default function Footer(){
    return (
        <div className="Footer">
            <div className="container">
                <div className="row footer-items">
                    <div className="col-12 col-sm-3 col-lg-3 order-sm-1 order-lg-1 order-4">
                        <div className="Footer-logo" >
                            <img src="/images/footer-logo.png" alt="Kastlemark"/>
                            <span>&copy; 2019 Kastlemark</span>   
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 col-lg-3 order-sm-2 order-lg-2 border-lg border-sm order-3">
                        <h5>Explore</h5>
                        <ul>
                            <li>Home</li>
                            <li>For Sale</li>
                            <li>About Us</li>
                            <li>Login</li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-3 col-lg-3 order-sm-3 order-lg-3 border-lg border-sm order-2">
                        <h5>Contact Us</h5>
                        <span><i className="fas fa-map-marker-alt" />&nbsp;&nbsp;676 E. Locust Ave Ste 120 Fresno, CA. 93720</span>
                        <span><i className="fas fa-phone-alt" />&nbsp;&nbsp;559-473-2021</span>
                        <span><i className="fas fa-envelope" />&nbsp;&nbsp;contact@hgm-co.com</span>
                        
                    </div>
                    <div className="col-12 col-sm-3 col-lg-3 order-1 order-sm-4 order-lg-4 border-sm ">
                        <h5>Subscribe</h5>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Subscribe To Us Now</label>
                            <input type="email" 
                                   className="form-control" 
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp" 
                                   placeholder="Enter email" />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .Footer{
                    background-color: #0B0B09;
                    color: white;
                    padding: 20px 0;
                }
                .Footer-logo{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    // text-align: center;
                    align-items: center;
                }
                .Footer-logo img{
                    height: auto;
                    width: 112px;
                }
                .Footer-logo span{
                    margin-top: 10px;
                    font-size: 12px;
                }

                .row div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                h5{
                    color: #2560A4;
                    font-size: 14px;
                    font-weight: 800;
                }
                ul{
                    padding: 0;
                    text-align: center
                }
                li{
                    list-style: none;
                }
                i.fas{
                    color: #2560A4
                }
                span{
                    text-align: center
                }

                @media screen and (max-width: 575px) {
                    .border-lg{
                        border-right: none;
                    }

                    .border-sm{
                        background-image: linear-gradient(#2560A4,#2560A4);
                        background-position: bottom center;
                        background-size: 50% 3px;
                        background-repeat: no-repeat;
                    }
                }
            
                @media screen and (min-width: 576px){
                    .border-lg{
                        background-image: linear-gradient(#2560A4,#2560A4);
                        background-position: right center;
                        background-size: 2px 50%;
                        background-repeat: no-repeat;
                    }

                    .border-sm{
                        border-bottom: none
                    }


                    span{
                        text-align: initial;
                    }

                    ul{
                        text-align: initial;
                    }
                }
            `}</style>
        </div>
    )
}