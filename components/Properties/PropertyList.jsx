export default function PropertyList ({children, count, time, pageSize, updatePages}) {

    const updatePageSize = (evt) => {
        updatePages(evt.target.value)
    }
    
    return (
        <div>
            <div className="PropertyList-header">
                <p>{count} results found in {time} seconds.</p>
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="sortBy">Sort by:</label>&nbsp;&nbsp;
                        <select className="form-control" id="sortBy">
                            <option value="">Choose...</option>
                            <option>...</option>
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
                    flex-direction: row;
                    justify-content: space-between;
                }
                p{
                    color: #777777;
                    font-size:14px;
                    font-weight: 400;
                }

            `}</style>
        </div>
    )
}