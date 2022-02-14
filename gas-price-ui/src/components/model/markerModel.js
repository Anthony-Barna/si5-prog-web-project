import { Marker, Popup } from "react-leaflet";
import React from "react";
import { colors } from "./colorsGasStation";
import L from 'leaflet';

export class MarkerModel{
    lat;
    long;
    text;
    color;

    buildIcon(){
        return L.icon({
            iconUrl: this.color,
            iconSize:     [38, 38], // size of the icon
            shadowSize: [38,38],
            shadowAnchor: [19,38],
            iconAnchor:   [19,38], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })
    }

    render(){
        return <Marker position={[this.lat, this.long]} icon={this.buildIcon()}><Popup>{this.text}</Popup></Marker>
    }

    constructor(lat, long, text, color = colors.PINK){
        this.lat = lat;
        this.long = long;
        this.text = text;
        this.color = color
    }
}