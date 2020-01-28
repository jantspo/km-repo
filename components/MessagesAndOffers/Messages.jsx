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
              
                        <div className="col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                            <div className="form-group">
                                <label htmlFor="sortBy">Display:</label>&nbsp;&nbsp;
                                <select className="form-control" id="sortBy" value={pageSize} onChange={updatePageSize}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
              
                    </div>
                   
                </div>
            </div>
            {
                messages.map(message => {
                    return  <MessageRow message={message} save={save} key={message.id} saved={saved}/>
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