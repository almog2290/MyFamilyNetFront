import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useMutation,useQueryClient } from '@tanstack/react-query';
import {useAxiosPrivate} from 'hooks/useAxiosPrivate';

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
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AddCircleIcon from '@mui/icons-material/AddCircle';


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

const PostCreationCard = ({pageId}) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const handleAddPost = () => {
    setDrawerOpen(true);
  };

  const createPost = async (newPost) => {
    const response = await axiosPrivate.post(`/social/posts/page/${pageId}`, newPost);
    return response.data;

  }

  const { mutate: createMutation, isLoading, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
        queryClient.invalidateQueries(['posts', pageId]);
    },
    onError: (error) => {
        console.error('Error creating post:', error);
    },
  }); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    createMutation({ description });
    setDrawerOpen(false);
    setDescription('');
  };

  return (
    <>
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
                    <DynamicFeedIcon fontSize="inherit" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                    primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                        New Post
                    </Typography>
                    }
                    secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                        Please click the button to create a new post
                    </Typography>
                    }
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    endIcon={<AddCircleIcon />} 
                    sx={{ ml: 2 }}
                    onClick={handleAddPost}
                >
                    Add
                </Button>
                </ListItem>
            </List>
            </Box>
        </CardWrapper>

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Create New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-input': {
                  maxHeight: '200px',
                  overflow: 'auto',
                },
              }}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Creating ..." : "Create Post"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

PostCreationCard.propTypes = {
    pageId: PropTypes.string,
};

export default PostCreationCard;