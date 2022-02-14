import Map from "../../components/map/Map"
import React from "react";
import "./mapAccess.css";
import { MarkerModel } from "../../components/model/markerModel";
import { colors } from "../../components/model/colorsGasStation";


export function MapAccess () {
    let markersList = [new MarkerModel(43.27, 5.40, "Your position"), new MarkerModel(45.27, 7.40, "Your position2", colors.GREEN), new MarkerModel(44.27, 7.40, "WOW", colors.RED)]
    // let markersList = []

    return (
        <div id="map-access">
            <h1>Map selection</h1>
            <Map id="map" position={[45,45 ]} markers={markersList}/>
        </div>
    )
}