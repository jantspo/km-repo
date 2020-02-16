export default function Pagination({totalPages, updatePage, pageUp, pageDown, page}) {
    const getPages = (totalPages) => {
        const pageTabs = [];
        for(let x = 0; x < totalPages; x++){
            const ind = x + 1;
            pageTabs.push(                
                <li key={ind} className={`page-item ${page == ind ? 'disabled' : '' }`}><a className="page-link"  onClick={changePage} data-page={ind}>{ind}</a></li>
            )
        }
        return pageTabs;
    };

    const changePage = (evt) => {
        const val = evt.target.dataset.page;
        if(val !== page) updatePage(val);
    }

    const incrementPage = () => {
        pageUp()
    }

    const decrementPage = () => {
        pageDown()
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page == 1 ? 'disabled' : ''}`}>
                    <a className="page-link" tabIndex="-1" aria-disabled="true" onClick={decrementPage} >Previous</a>
                </li>
                    {getPages(totalPages)}
                <li className={`page-item ${page == totalPages ? 'disabled' : '' }`}>
                    <a className={`page-link`} onClick={incrementPage}>Next</a>
                </li>
            </ul>
            <style jsx>{`
                .page-link{
                    color: #255FA3 !important;
                    cursor: pointer
                }
                .disabled > .page-link{
                    color: grey !important;
                    
                }
            `}</style>
        </nav>
    )
}