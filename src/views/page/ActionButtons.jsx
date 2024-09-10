import React from 'react';
import { Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionButtons = ({ keycloak, comment, handleEditClick, deleteCommentAction, isEditing }) => {
    return (
        <Box display="flex" flexDirection="column">
            <IconButton edge="end" aria-label="like">
                <ThumbUpIcon />
            </IconButton>
            {keycloak?.subject === comment?.user.id && (
                <>
                    <IconButton 
                        edge="end" 
                        aria-label="edit" 
                        onClick={handleEditClick}
                        disabled={isEditing}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton 
                        onClick={() => deleteCommentAction(comment.id)} 
                        edge="end" 
                        aria-label="delete"
                        disabled={isEditing}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default ActionButtons;