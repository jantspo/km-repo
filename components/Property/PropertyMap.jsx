import React from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerComponent = () => {
    return <div>
        <i className="fas fa-map-marker-alt map-marker" />
        <style>
            {`
                i.map-marker{
                    color: orange;
                    font-size: 30px;
                    top: 50%; 
                    left: 50%;
                    transform: translate(-50%, -50%)
                }
            `}
        </style>
    </div>
}

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
                    <button className="btn btn-danger btn-sm" onClick={close}>X</button>
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
                >
                     <MarkerComponent
                        lat={lat}
                        lng={long}
                        text="My Marker"
                    />
                </GoogleMapReact>
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
                @media screen and (orientation: landscape){
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