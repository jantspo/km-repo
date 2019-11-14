export default function Footer(){
    return (
        <div className="Footer">
            <div className="Footer-logo" >
                <img src="/images/footer-logo.png" alt="Kastlemark"/>
                <span>&copy; 2019 Kastlemark</span>   
            </div> 
 

            <style jsx>{`
                .Footer{
                    background-color: #0B0B09;
                    color: white;
                    padding: 20px
                }
                .Footer-logo{
                    width: 34%;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                }
                .Footer-logo img{
                    height: auto;
                    width: 100%
                }
                .Footer-logo span{
                    margin-top: 10px;
                    font-size: 12px;
                }
            `}</style>
        </div>
    )
}