import React from "react";
// import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
import './Map.css';

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position: (props.position) ? props.position : [43.27, 5.40]
        }
    }

    changePos(){
        this.setState({position: [0, 0]})
    }

    render(){
        const mapStyle = {
            height: '100%',
        }
        return (
            <>  
                <div id="map" style={mapStyle}>
                    <MapContainer center={this.state.position} zoom={9}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={this.state.position}>
                            <Popup>
                                Your position
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </>
        )
    }
}
