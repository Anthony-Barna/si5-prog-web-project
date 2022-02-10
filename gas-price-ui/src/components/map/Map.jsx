import React from "react";
import { Typography,Button } from '@mui/material';
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Map() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const navigate = useNavigate();

    const getAllGasStation = (() => {
        fetch(`http://localhost:8080/api/sales-points`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                setIsLoaded(true);
                setResults(jsonResponse);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    })

    // limit:int, road:string, distance:number, price:number, fuel:string
    const getListOfGasStation = (( limit = 5, road= null, distance= null, price= null, fuel= null) => {
        let request = '?limit=${limit}';
        if(road != null) { request = request + '&road=' + road }
        if(distance != null) { request = request + '&distance=' + distance }
        if(price != null) { request = request + '&price=' + price }
        if(fuel != null) { request = request + '&fuel=' + fuel }

        fetch(`http://localhost:8080/api/sales-points${request}`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                setIsLoaded(true);
                setResults(jsonResponse);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    })

    // JE SAIS PAS ENCORE FAIRE DE TESTS AVEC REACT ALORS LAISSEZ MOI ESSAYER
    const listOfGasStationNoArg = getListOfGasStation();
    const listOfGasStationLim = getListOfGasStation(5);
    const listOfGasStationRoad = getListOfGasStation(5, "Toulon");
    const listOfGasStationDistance = getListOfGasStation(5, "Toulon", 3);
    const listOfGasStationPrice = getListOfGasStation(5, null, null, 1.5);
    const listOfGasStationFuel = getListOfGasStation(5, null, null, null, "SP98");

    return (
        <>
            <Typography>Bite</Typography>
            <Button onClick={() => {
                navigate({ pathname: '/statistics'})
            } } >
                Click
            </Button>
        </>
    )
}
