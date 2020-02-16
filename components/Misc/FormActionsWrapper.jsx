export default function FormActionsWrapper({children}) {
    return(
        <div className="FormActionsWrapper" >
            {children}
            <style jsx>{`
                .FormActionsWrapper{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }
            `}</style>
        </div>
    )
}