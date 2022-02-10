import { Marker, Popup } from "react-leaflet";
import React from "react";

export class MarkerModel{
    lat;
    long;
    text;

    render(){
        return <Marker position={[this.lat, this.long]}><Popup>{this.text}</Popup></Marker>
    }

    constructor(lat, long, text){
        this.lat = lat;
        this.long = long;
        this.text = text;
    }
}