export default function PropertyList ({children, count, time, pageSize, updatePages, updateOrder}) {

    const updatePageSize = (evt) => {
        evt.persist();
        updatePages(parseInt(evt.target.value));
    }

    const changeOrder = (evt) => {
        const value = evt.target.value.split(',');
        updateOrder({by: value[0], dir: value[1]});
    }
    
    return (
        <div>
            <div className="PropertyList-header">
                <p>{count} results found in {time} seconds.</p>
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="sortBy">Sort by:</label>&nbsp;&nbsp;
                        <select className="form-control" id="sortBy" onChange={changeOrder}>
                            <option defaultValue value={['createdAt', 'DESC']} >List Date - Newest</option>
                            <option value={['createdAt', 'ASC']}>List Date - Oldest</option>
                            <option value={['list_price', 'ASC']}>List Price - Low to High</option>
                            <option value={['list_price', 'DESC']}>List Price - High to Low</option>
                            <option value={['arv', 'ASC']}>ARV Price - Low to High</option>
                            <option value={['arv', 'DESC']}>ARV Price - High to Low</option>
                            <option value={['roi', 'ASC']}>ROI - Low to High</option>
                            <option value={['roi', 'DESC']}>ROI - High to Low</option>
                            <option value={['cap_rate', 'ASC']}>Cap Rate - Low to High</option>
                            <option value={['cap_rate', 'DESC']}>Cap Rate - High to Low</option>
                        </select>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
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
            
            <hr/>
            {children}
            <style jsx>{`
                .PropertyList-header{
                    display: flex;
                    flex-direction: column;
                }
                p{
                    color: #777777;
                    font-size:14px;
                    font-weight: 400;
                }
                .options{
                    display: flex;
                    flex-direction: column;
                }
                @media screen and (max-width: 679px){
                    .form-inline{
                        display: flex;
                        justify-content: flex-end;
                    }
                }
           
                @media screen and (min-width: 680px){
                    .options{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .PropertyList-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </div>
    )
}