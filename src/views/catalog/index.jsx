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
  const {data : pages , isLoading, error} = useFetch('/social/public/pages')


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
       {error && <div> {error} </div>}
        <Grid container spacing={gridSpacing}>
            {pages?.map((page) => (
              <Grid item sm={6} xs={12} md={6} lg={12} key={page.id}>
                <PageCard 
                  {...{
                    isLoading: isLoading,
                    page_name: page.name,
                    label: page.description,
                    icon: <DescriptionTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            ))}
            {isAuthenticated && (
              <Grid item sm={6} xs={12} md={6} lg={12} key={"auth"}>
              <PageCreationCard 
                {...{
                  isLoading: isLoading,
                  userId: keycloak?.subject,
                  fullName : keycloak?.idTokenParsed?.name
                }}
                />
              </Grid>
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
