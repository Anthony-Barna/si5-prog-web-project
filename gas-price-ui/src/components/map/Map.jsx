import React, { useMemo } from "react";
import { useState } from 'react'
// import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet';

// import 'leaflet/dist/leaflet.css';
import './Map.css';
import { requirePropFactory } from "@mui/material";

function LocationMarker() {
    const [position, setPosition] = useState(null)

    let positionIcon = L.icon({
        iconUrl: require("../../asset/pinContrast.png"),
        iconSize:     [38, 38], // size of the icon
        shadowSize: [38,38],
        shadowAnchor: [19,38],
        iconAnchor:   [19,38], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    const map = useMap();
    map.locate()
    map.addEventListener('locationfound', (e) => {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
    })

    return position === null ? null : (
      <Marker position={position} icon={positionIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position: (props.position) ? props.position : [43.27, 5.40],
            markers: props.markers
        }
    }

    changePos(){
        this.setState({position: [0, 0]})
    }

    render(){
        const mapStyle = {
            height: '100%',
        }

        let gasStation = L.icon({
            iconUrl: require("../../asset/gas-station.png"),
            iconSize:     [38, 38], // size of the icon
            shadowSize: [38,38],
            shadowAnchor: [19,38],
            iconAnchor:   [19,38], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })

        let markersRender = []
        for(let marker of this.state.markers){
            markersRender.push(marker.render(gasStation))
        }

        return (
            <>  
                <div id="map" style={mapStyle}>
                    <MapContainer center={this.state.position} zoom={9}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                        {/* <Marker position={this.state.position}>
                            <Popup>
                                Your position
                            </Popup>
                        </Marker> */}
                        {markersRender}
                    </MapContainer>
                </div>
            </>
        )
    }
}
