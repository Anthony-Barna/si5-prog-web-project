import React from "react";
import { Typography,Button } from '@mui/material';
import { useNavigate } from "react-router";

export default function Map() {

    const navigate = useNavigate();
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

function getListOfGasStation(limit) {
    fetch(`http://localhost:8080/api/sales-points?limit=${limit}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse);
            return jsonResponse;
        })
}
