import React , { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import NewComment from './NewComment';
import useAuth from 'hooks/useAuth';
import CommentSideButtons from './CommentSideButtons';

function CommentList({ postId }) {
    const axiosPrivate = useAxiosPrivate();
    const {keycloak} = useContext(AuthContext);

    const { data: comments, isError, isPending } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/social/posts/${postId}/comments?page=0&size=5`);
            console.log(response.data);
            return response.data;
        }
    });

    if (isPending) return (
        <>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
        </>
    );
    if (isError) return (
        <>
        <Alert severity="error">Error fetching comments</Alert>
        </>
    );

    return (
        <>  
        <NewComment postId={postId} />
        <List>
            {comments.map(comment => (
                <React.Fragment key={comment.commentId}>
                    <ListItem 
                        secondaryAction={
                            <CommentSideButtons comment={comment} keycloak={keycloak} postId={postId} />
                        } 
                        alignItems="flex-start"
                    >
                    <ListItemAvatar>
                        <Avatar alt={comment.owner.name} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                        <ListItemText
                            primary={comment.owner.name}
                            secondary={
                                <React.Fragment>
                                    {comment.comment}
                                </React.Fragment>
                            }
                            style={{ textTransform: 'none' }}
                        />                    
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
        </List>
        </>
    );
}

export default CommentList;