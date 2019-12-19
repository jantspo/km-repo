import Modal from 'react-bootstrap/Modal';

export default function ModalWrapper({children, title, close, show}) {
    
    return (
        <div>
            {
                show && 
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {children}
                    </Modal.Body>

                    {/* <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer> */}
                </Modal.Dialog>
            }
        </div>
       
   )
}