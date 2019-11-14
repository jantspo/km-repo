export default function InfoBox({title, content}) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
            <style jsx>{`
                h3{
                    color: #2D5C97;
                    font-weight: 700;
                    font-size: 25px;
                }
            `}</style>
        </div>
    )
}