import {useState} from 'react';
import MessageRow from './MessageRow';
import http from '../../helpers/http.helper';

export default function Messages ({messages, save, saved,  updatePageSize, pageSize, }){
    
    const updateValue = () => {

    }

    return <div>
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* <div className="col-12 col-md-6 col-lg-8">
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
                        </div> */}
                        {
                            messages.length > 0 &&
                            <div className="col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                                <div className="form-group form-inline display-options">
                                    <label htmlFor="sortBy">Display:</label>&nbsp;&nbsp;
                                    <select className="form-control" id="sortBy" value={pageSize} onChange={updatePageSize}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                        }
                        
                    </div>
                   
                </div>
            </div>
            {
                messages.length > 0 && messages.map(message => {
                    return  <MessageRow message={message} save={save} key={message.id} saved={saved}/>
                })
            }
            {
                messages.length === 0 &&
                <h4>No messages to display.</h4>
            }
        </div>
        <style jsx>{`
            .card{
                border-radius: 0;
                box-shadow: none;
            }
            h4{
                margin-bottom: 0;
                color: #2E5D95;
                text-align: center;
                background-color: white;
                padding-bottom: 40px;
            }
            .display-options{
                display: flex;
                justify-content: flex-end;
            }
        `}</style>
    </div>
}