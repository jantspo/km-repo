import {useState, useEffect} from 'react';
import {getDateTime} from '../../helpers/time.helper';
import MessageResponseForm from './MessageResponseForm';

export default function Message ({message, save, saved}){
    const [showForm, setForm] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if(saved === true){
            setForm(false);
        }
    }, [saved])

    const toggleForm = () => {
        setForm(!showForm);
    }

    const getAddress = (asset) => {
        return `${asset.address}, ${asset.city}, ${asset.state}`
    }
    const getMessageBlurb = (message) => {
        return `${message.slice(0, 50)}...`;
    }

    const closeForm = () => {
        setForm(false);
    }

    const getNewMessageCount = (responses) => {
        const newResp = responses.filter(resp => {
            return resp.km_user_viewed && resp.km_user_viewed.read === false;
        })
        return newResp.length;
    }

    return  <div className="card" key={message.id}>
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0 message-info">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#message-${message.id}`} aria-expanded="true" aria-controls={message.id}>
                            {getDateTime(message.createdAt)} - {getAddress(message.asset)} - {getMessageBlurb(message.message)} 
                        </button>
                        <div className="message-response-info">
                            <p>Responses: {message.responses.length}</p>
                            <p>New: {getNewMessageCount(message.responses)}</p>
                        </div>
                    </h2>
                </div>

                <div id={`message-${message.id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                        <div>
                            {message.message}
                        </div>
                        <hr />
                        {
                            showForm ? 
                                <div>
                                    <MessageResponseForm messageId={message.id} save={save} close={closeForm}/>
                                </div>
                            :
                
                                saved ? 
                                <div className="alert alert-primary">
                                        Message Sent!
                                </div>
                                :
                                <div className="respond-wrapper">
                                    <button className="btn btn-primary" onClick={toggleForm}>Respond</button>
                                </div>
                        }
                        <div className="responses">
                            {message.responses.map(resp => {
                                return <div className="response" key={resp.id}>
                                    <div className="poster">
                                        <i className="fas fa-user-circle" />
                                        {resp.user ?
                                            `${resp.user.first_name} ${resp.user.last_name}` :
                                            'Me'
                                        }&nbsp;&nbsp;at:&nbsp;
                                        {
                                            getDateTime(resp.createdAt)
                                        }
                                    </div>
                                   <div className="response-body">
                                    {
                                        resp.message
                                    }
                                   </div>
                                  
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .responses{
                        margin-top: 15px;
                    }
                    .card{
                        border-radius: 0;
                        box-shadow: none;
                        border-top: 1px solid grey;
                        border-bottom: 1px solid grey;
                        background-color: white;
                    }
                    .btn-link{
                        color: #2E5D95;
                        font-weight: 600;
                        text-align: start;
                    }
                    .message-info{
                        display: flex;
                        justify-content: space-between;
                    }
                    .message-response-info{
                        display: flex;
                        justify-content: space-between;
                    }
                    .message-response-info p{
                        margin-right: 10px;
                    }
                    .respond-wrapper{
                        display: flex;
                        margin-top: 10px;
                        justify-content: flex-end;
                    }
                    hr{
                        border-top: 1px solid rgba(0,0,0,.5);
                    }
                    .response{
                        border-top: 1px solid rgba(0,0,0,.5);
                    }
                    .poster{
                        border-bottom: 1px solid rgba(0,0,0,.1);
                        padding: 10px;
                    }
                    .response-body{
                        padding: 15px;
                    }
                    @media screen and (max-width: 991px){
                        .message-info{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        .message-response-info{
                            justify-content: flex-end;
                        }
                    }
                `}</style>
            </div>
}