import {useState, useEffect} from 'react';

export default function ModalWrapper({children, title, close, buttonName, button, showModal}) {
    const [show, setShowing] = useState(false);

    useEffect(()=>{
        setShowing(showModal)
    }, [showModal])

    const toggle =() => {
        setShowing(!show);
    }

    return (
        <div>
            {   
                button && 
                <div className="">
                    <button className="btn btn-primary" onClick={toggle}>{buttonName}</button>
                </div>
            }
 
        
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
                    position: fixed;
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