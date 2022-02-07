import React from "react";
import { Typography,Button } from '@mui/material';
import { useNavigate } from "react-router";

export default function Map() {

    const navigate = useNavigate();

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
