export default function PageHeader({header}) {
    return (
        <div className="PageHeader">
            <h1 className="underline">
                {header}
            </h1>
            <style jsx>{`
                .PageHeader{
                    width: 100%;
                    text-align: center;
                    margin-bottom: 60px;
                }

                .PageHeader > h1{
                    color: #2C609B;
                    font-size: 33px;
                    font-weight: 700;
                    display: inline
                }
            `}</style>
        </div>

    )
}