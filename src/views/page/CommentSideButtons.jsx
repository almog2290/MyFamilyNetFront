import React , {useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ActionButtons from './ActionButtons';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CommentSideButtons = ({ comment, keycloak , postId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.text);
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteComment = async (commentId) => {
        const response = await axiosPrivate.delete(`/social/comments/${commentId}`);
        return response.data;
    };

    const updateComment = async ({commentId, text}) => {
        const response = await axiosPrivate.put(`/social/comments/${commentId}`, { description : text });
        return response.data;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        },
        onError: (error) => {
            console.error('Error updating comment:', error);
        },
    });

    const deleteCommentAction = (commentId) => {
        console.log('delete comment', commentId);
        deleteMutation.mutate(commentId);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedComment(comment.comment);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedComment(comment.comment);
    };

    const handleSaveClick = () => {
        updateMutation.mutate({ commentId: comment.id, text: editedComment });
        setIsEditing(false);
    };

    return (
        <>
            <IconButton edge="end" aria-label="options" onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <ActionButtons 
                        keycloak={keycloak} 
                        comment={comment} 
                        handleEditClick={handleEditClick} 
                        deleteCommentAction={deleteCommentAction} 
                        isEditing={isEditing} 
                    />
                </MenuItem>
            </Menu>

            <Drawer anchor="right" open={isEditing} onClose={handleCancelClick} {...(!isEditing && { inert: '' })}>
                <Box p={2} width="300px">
                    <TextField
                        label="Edit Comment"
                        multiline
                        fullWidth
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default CommentSideButtons;