import {useState} from 'react';

export default function Footer(){
    const [showEmail, setShowEmail] = useState(true);
    const subscribe = () => {
        setShowEmail(false);
    };

    return (
        <div className="Footer">
            <div className="container">
                <div className="row footer-items">
                    <div className="col">
                        <div className="Footer-logo" >
                            <img src="/images/footer-logo.png" alt="Kastlemark"/>
                            <span>&copy; 2019 Kastlemark</span>   
                        </div>
                        <div className="footer-item links">
                            <h5>Explore</h5>
                            <ul>
                                <li>Home</li>
                                <li>For Sale</li>
                                <li>About Us</li>
                                <li>Login</li>
                            </ul>
                        </div>
                        <div className="footer-item contact">
                            <h5>Contact Us</h5>
                            <div className="contact-info" >
                                <i className="fas fa-map-marker-alt" />&nbsp;&nbsp;<span>676 E. Locust Ave Ste 120 Fresno, CA. 93720</span>
                            </div>
                            <span><i className="fas fa-phone-alt" />&nbsp;&nbsp;559-473-2021</span>
                            <span className="contact-email" ><i className="fas fa-envelope" />&nbsp;&nbsp;contact@hgm-co.com</span>
                        </div>
                        <div className="footer-item subscribe">
                            <h5>Subscribe</h5>
                            {showEmail ? 
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Subscribe To Us Now</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={subscribe}>
                                                <i className="fas fa-envelope" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                :
                                "Subscribed!"
                            }
                         
                            
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
                    align-items: center;
                    margin-top: 10px;
                }

                .Footer-logo img{
                    height: auto;
                    width: 112px;
                }

                .Footer-logo span{
                    margin-top: 10px;
                    font-size: 12px;
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

                .col{
                    display: flex;
                    flex-direction: column-reverse;
                }        
            
                .footer-item{
                    text-align: center;
                    background-image: linear-gradient(#2560A4,#2560A4);
                    background-position: bottom center;
                    background-size: 50% 3px;
                    background-repeat: no-repeat;
                    margin: 10px 0;
                }

                .contact{
                    display: flex;
                    flex-direction: column;
                    padding: 0 60px
                }

                .contact-email{
                    margin-bottom: 20px
                }

                @media screen and (min-width: 480px) and (max-width: 767px){
                    .col{
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }  

                    .col > *{
                        width: 50%;
                    }
    
                    .Footer-logo{
                        width: auto;
                    }

                    .contact{
                        padding: 0;
                    }

                    .contact > * {
                        text-align: start
                    }

                    .footer-item{
                        text-align: center;
                        background-image: none;
                        margin: 10px 0;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1199px){
                    .col{
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }  

                    .col > *{
                        width: 25%;
                    }
    
                    .Footer-logo{
                        width: auto;
                    }

                    .contact{
                        padding: 0;
                    }

                    .contact > * {
                        text-align: start
                    }

                    .footer-item{
                        text-align: start;
                        background-image: none;
                        margin: 10px 0;
                    }

                    ul{
                        text-align: start
                    }
                }

                @media screen and (min-width: 1200px){
                    .col{
                        flex-direction: row;
                        justify-content: space-between;
                    }  

                    .subscribe{
                        width: 25%;
                        padding: 0 30px 0;
                        background-image: none !important;
                    }

                    .links{
                        width: 10%
                    }

                    .contact{
                        width: 25%;
                        padding: 0 30px;
                    }

                    .Footer-logo{
                        width: 40%;
                    }

                    .footer-item{
                        text-align: start;
                    }

                    ul{
                        text-align: start
                    }

                    span{
                        text-align: start
                    }

                    .contact-info{
                        display: flex;
                        flex-direction: row;
                    }

                    .footer-item{
                        background-image: linear-gradient(#2560A4,#2560A4);
                        background-position: right center;
                        background-size: 1px 50%;
                        background-repeat: no-repeat;
                    }
                    ul{
                        text-align: start
                    }
                }

                button{
                    background-color: white;
                }

                button:hover{
                    
                    background-color: #2560A4;
                    border-color: #2560A4;
                }
                button:hover i {
                    color: #fff;
                }
            `}</style>
        </div>
    )
}