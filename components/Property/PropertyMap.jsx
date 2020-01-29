import GoogleMapReact from 'google-map-react';
import {useRef} from 'react';
export default function PropertyMap ({lat, long, close, address, city, state, zip}) {
    const getAddress = () => {
        let sepAddress = address.split(' ');
        let sepCity = city.split(' ');
        let combinedAddress = '';
        let combinedCity = '';
        sepAddress.forEach((part, i) => {
            combinedAddress += part + '+'
        });
        sepCity.forEach((part, i) => {
            combinedCity += part + '+'
        });
        return combinedAddress + combinedCity + state + "+"  + zip;
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="options">
                {/* https://www.google.com/maps/place/4571+N+Bain+Ave,+Fresno,+CA+93722/@36.8014138,-119.9002051,17 */}
                    <a href={`https://www.google.com/maps/place/${getAddress()}/@${lat},${long}`} target="_blank">View on Google Maps</a>
                    <button className="btn btn-danger" onClick={close}>X</button>
                </div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBstPvgwT9HFITUmFRCrbh0eXY_rbKKjNY' }}
                    defaultCenter={
                        {  
                            lat: lat,
                            lng: long
                        }
                    }
                    defaultZoom={16}
                    options={
                        {
                            panControl: true,
                            mapTypeControl: true,
                            scrollwheel: true,
                            streetViewControl: true
                        }
                    }
                />
            </div>
  

            

            <style jsx>{`
                .card{
                    width: 100vw;
                    height: 100vw;
                    max-width: 800px;
                    max-height: 800px;
                    min-height: 320px;
                    padding-bottom: 32px;
                }
             
                .options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }

                @media screen and (max-width: 600px) {
                    .card{
                        width: 100vw;
                        height: 100vh;
                        padding-bottom: 32px;
                    }
                }
            `}</style>
        </div>
    )
}