import {useState} from 'react';

export default function ModalWrapper({children, title, close, buttonName}) {
    const [show, setShowing] = useState(false);

    const toggle =() => {
        setShowing(!show);
    }

    return (
        <div>
            <div className="">
                <button className="btn btn-primary" onClick={toggle}>{buttonName}</button>
            </div>
        
            {
                show && 
                <div className="modal-wrapper">
                    {/* <div className="card modal-card">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5> */}
                            <div className="modal-content-wrapper">
                                {children}
                            </div>
                            
                        {/* </div>
                    </div> */}
                </div>
            }
            
            <style jsx>{`
                .modal-wrapper{
                    padding-left: -15px;
                    padding-right: -15px;
                    position: absolute;
                    background: rgba(0,0,0,0.5);
                    z-index: 9000;
                    height: 100vh;
                    left: 0;
                    width: 100vw;
                    top: 0;
                }
                .modal-content-wrapper{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center; /*centers items on the line (the x-axis by default)*/
                    align-items: center; 
                }
            `}</style>
        </div>
   )
}