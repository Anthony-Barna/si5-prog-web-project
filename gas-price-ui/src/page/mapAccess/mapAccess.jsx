import Map from "../../components/map/Map"
import React from "react";
import "./mapAccess.css";
import { MarkerModel } from "../../components/map/markerModel";

export function MapAccess () {
    let markersList = [new MarkerModel(43.27, 5.40, "Your position"), new MarkerModel(45.27, 7.40, "Your position2")]

    return (
        <div id="map-access">
            <h1>Map selection</h1>
            <Map id="map" position={[0,0]} markers={markersList}/>
        </div>
    )
}