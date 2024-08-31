import React , {useState} from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const PostLine = ({postData}) => {
  return (
    <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={postData.user.name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={postData.user.name}
        secondary={
          <React.Fragment>
            {postData.description}
          </React.Fragment>
        }
      />
    </ListItem>
    </>
  )
}

PostLine.propTypes = {
    post: PropTypes.object
};

export default PostLine;
