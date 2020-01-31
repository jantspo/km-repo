import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

const MyMapComponent = ({lat, long}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBstPvgwT9HFITUmFRCrbh0eXY_rbKKjNY"
    })
    console.log(isLoaded, loadError);
    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that
        return <GoogleMap
                    zoom={16}
                    center={{ lat: lat, lng: long }}
                >
                    <Marker position={{ lat: lat, lng: long }} />
                </GoogleMap>
      }

      if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
      }
    
      console.log(renderMap());
      return isLoaded ? renderMap() : <div>Loading</div>
};

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
                    <a href={`https://www.google.com/maps/place/${getAddress()}/@${lat},${long}`} target="_blank">View on Google Maps</a>
                    <button className="btn btn-danger" onClick={close}>X</button>
                </div>
                {/* <GoogleMapReact
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
                /> */}
                  <MyMapComponent lat={lat} long={long} />
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