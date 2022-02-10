import React from "react";
import { Typography,Button } from '@mui/material';
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Map() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const navigate = useNavigate();

    const getListOfGasStation = ((limit) => {
        fetch(`http://localhost:8080/api/sales-points?limit=${limit}`)
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

    const listOfGasStation = getListOfGasStation(5);

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
