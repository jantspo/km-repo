import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function ({children, message, position}){
    
    return (
        <OverlayTrigger overlay={<Tooltip placement={position}>{message}</Tooltip>} placement={position}>
            {children}
        </OverlayTrigger>  
    )
}