import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import useFetch from 'hooks/useFetch';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import PageCard from './PageCard';
import PageCreationCard from './PageCreationCard';

import { gridSpacing } from 'store/constant';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';



// ==============================|| DEFAULT CATALOG ||============================== //

const Catalog = () => {
  const {keycloak,isAuthenticated} = useContext(AuthContext);
  const {data : pages , isLoading, error} = useFetch('/social/public/pages?page=0&size=10');


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
       {error && <div> {error} </div>}
        <Grid container spacing={gridSpacing}>
        {isAuthenticated && (
              <Grid item xs={12} key={"auth"}>
              <PageCreationCard 
                {...{
                  isLoading: isLoading,
                  userId: keycloak?.subject,
                  fullName : keycloak?.idTokenParsed?.name
                }}
                />
              </Grid>
            )}
            {pages?.map((page) => (
              <Grid item xs={12} key={page.id}>
                <PageCard 
                  {...{
                    isLoading: isLoading,
                    page: page,
                    label: page.description,
                    icon: <DescriptionTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
