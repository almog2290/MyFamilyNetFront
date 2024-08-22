import React , { useState}from 'react'
import { useLocation } from 'react-router-dom';
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';

function Page() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const description = searchParams.get('desc');


    return (
        <MainCard 
            title={name? name : "Page"} 
            subTitle={description? description : "Information about the page"}
        >
        <Typography variant="body2">
            info
        </Typography>
    </MainCard>
    )
}

export default Page
