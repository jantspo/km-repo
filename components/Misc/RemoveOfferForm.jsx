export default function RemoveOfferForm ({cancel, remove}) {
    return (
        <div>
            <p className="alert-danger alert">This action is cannot by undone. Confirm removing offer:</p>
            <div className="options">
                <button className="btn btn-primary" onClick={remove}>Confirm</button>
                <button className="btn btn-danger" onClick={cancel}>Cancel</button>
            </div>
            <style jsx>{`
                .options{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }
                .options .btn-primary{
                    margin-right: 10px;
                }
            `}</style>
        </div>
    )
}