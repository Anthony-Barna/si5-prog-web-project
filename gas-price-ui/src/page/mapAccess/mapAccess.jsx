import Map from "../../components/map/Map"
import React from "react";
import "./mapAccess.css";

export function MapAccess () {
    return (
        <div id="map-access">
            <h1>Map selection</h1>
            <Map id="map"/>
        </div>
    )
}