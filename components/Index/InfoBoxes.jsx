import InfoBox from './InfoBox';
import Testimonials from './Testimonials';

export default function InfoBoxes(){
    const infoBoxes = [
        {
          title: 'Deal Diary',
          content: "From offer to closing and everything in between, a diary of all the activity is recorded for you."
        },
        {
          title: 'To-Do List',
          content: "A simple step-by-step list guides you through the deal process."
        },
        {
          title: 'Due Diligence',
          content: "From offer to closing and everything in between, a diary of all the activity is recorded for you."
        },
        {
          title: 'Escrow',
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
                <div className="col-xs-12 col-sm-4 col-md-5 offset-lg-2 col-lg-4 col-xl-5 offset-xl-1">
                  <div className="infoBoxes-wrapper" >
                    {
                      infoBoxes.map(box => {
                      return <InfoBox {...box} key={box.title} />
                      })
                    }
                  </div>
                
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7 col-lg-4 col-xl-5 infoBox-image">
                    <img src="/images/feature-laptop.png" className="img-fluid" alt="laptop"/>
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

                  .infoBoxes-wrapper{
                    width: 100%;
                    padding: 15px
                  }

                  .testimonials{
                    padding: 15px;
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
                  
                  @media screen and (min-width: 576px){
                    .infoBox-image{
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      vertical-align: middle;
                      margin-top: 0
                    }

                    .infoBox-image img{
                      max-width: 100%;
                      height: auto;
                    }
                  }
          
                  @media screen and (max-width: 767px){
                    .infoBox{
                      padding: 60px 0;
                    }
        
                    .testimonials{
                      margin-top: 60px;
                    }
                  }

                  @media screen and (min-width: 768px){
                    .infoBoxes-wrapper{
                      padding: 15px 0;
                    }

                    // .infoBox-image{
                    //   margin-top: 60px;
                    //   display: flex;
                    //   justify-content: center;
                    //   wdith: 100%;
                    // }
  
                    // .infoBox-image img{
                    //   max-width: 100%;
                    //   height: auto;
                    // }

                  }
            `}</style>
        </div>
    )
}