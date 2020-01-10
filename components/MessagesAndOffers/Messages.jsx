import {useState} from 'react';
import Message from './Message';
import http from '../../helpers/http.helper';

export default function Messages ({messages, save, saved}){
    
    const updateValue = () => {

    }

    return <div>
        <div className="accordion" id="accordionExample">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-8">
                            Total Messages: {messages.length}
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <input type="text" 
                                    formNoValidate
                                    className="form-control"
                                    id='search'
                                    value=''
                                    onChange={updateValue}
                                    aria-describedby="emailHelp" 
                                    placeholder={'Search Messages'} />
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            {
                messages.map(message => {
                    return  <Message message={message} save={save} key={message.id} saved={saved}/>
                })
            }
        </div>
        <style jsx>{`
            .card{
                border-radius: 0;
                box-shadow: none;
            }
            
        `}</style>
    </div>
}