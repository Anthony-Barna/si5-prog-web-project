import React from "react";
// import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
import './Map.css';
export default function Map() {

    // const navigate = useNavigate();

    const mapStyle = {
        height: '100%',
    }

    return (
        <>  
            <div id="map" style={mapStyle}>
                <MapContainer center={[51.505, -0.09]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}
