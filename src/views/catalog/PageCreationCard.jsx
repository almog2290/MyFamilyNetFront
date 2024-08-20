import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPrivate } from 'hooks/useGetPrivate';
import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ConsoleView } from 'react-device-detect';
import { useContext, useEffect } from 'react';
import { is } from 'immutable';
import { Co2Sharp } from '@mui/icons-material';



// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const PageCreationCard = ({ isLoading , userId , fullName }) => {
  const theme = useTheme();
  const navigate  = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData , data } = useGetPrivate();
  

  const handleAddPage = async () => {
    await fetchData(`/social/users/${userId}`, setIsPending , setError);
  }; 

  useEffect(() => {

    if(!isPending && data){
      navigate('/pages/create-page')
    }

    if(!isPending && error){
      navigate(`/pages/user-details/?name=${fullName}`);
    }

  }, [isPending,error]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'primary.800',
                      color: '#fff'
                    }}
                  >
                    <PostAddTwoToneIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      New Page
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                      Please click the button to create a new page
                    </Typography>
                  }
                />
                <Button 
                  variant="contained" 
                  color="secondary" 
                  endIcon={<AddCircleIcon />} 
                  sx={{ ml: 2 }}
                  onClick={handleAddPage}
                >
                  Add
                </Button>
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

PageCreationCard.propTypes = {
  isLoading: PropTypes.bool,
  userId: PropTypes.string,
  fullName: PropTypes.string
};

export default PageCreationCard;