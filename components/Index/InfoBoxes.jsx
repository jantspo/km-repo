import InfoBox from './InfoBox';
import Testimonials from './Testimonials';

export default function InfoBoxes(){
    const infoBoxes = [
        {
          title: 'Deal Diary.',
          content: "From offer to closing and everything in between, a diary of all the activity is recorded for you."
        },
        {
          title: 'To-Do List.',
          content: "A simple step-by-step list guides you through the deal process."
        },
        {
          title: 'Due Diligence.',
          content: "From offer to closing and everything in between, a diary of all the activity is recorded for you."
        },
        {
          title: 'Escrow.',
          content: "From offer to closing and everything in between, a diary of all the activity is recorded for you."
        }
      ]
    return (
        <div className="infoBox">
            <div className="infoBox-header"> 
              <h2>How Online Closing Works.</h2>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  {
                    infoBoxes.map(box => {
                    return <InfoBox {...box} key={box.title} />
                    })
                  }
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="infoBox-image">
                      <img src="/images/feature-laptop.png" className="img-fluid" alt="laptop"/>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="testimonials">
                <div className="infoBox-header"> 
                  <h2>Join the Kastlemark Family</h2>
                </div>
                <p>Our goal is to save you time and money and be your go to source for all your future flips.</p>
                <Testimonials />
            </div>
            <style jsx>{`
                 .infoBox{
                    background-color: white;
                  }
          
                  .infoBox .infoBox-header{
                    display: flex;
                    justify-content: center;
                  }

                  .testimonials p{
                    text-align: center;
                  }
                  
                  .infoBox .infoBox-header h2{
                    font-size: 1.6rem;
                    font-weight: 800;
                    background-image: linear-gradient(#2E5D95,#2E5D95);
                    background-position: bottom center;
                    background-size: 50% 3px;
                    background-repeat: no-repeat;
                    padding-bottom: 10px;
                  }
          
                  @media screen and (max-width: 767px){
                    .infoBox{
                      padding: 60px 10px;
                    }
          
                    .infoBox-image{
                      margin-top: 60px;
                      display: flex;
                      justify-content: center
                    }
          
                    .testimonials{
                      margin-top: 60px;
                    }
                  }
            `}</style>
        </div>
    )
}