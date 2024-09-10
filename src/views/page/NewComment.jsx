import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useMutation , useQueryClient } from '@tanstack/react-query';

const NewComment = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const addComment = async (newComment)  => {
        const response = await axiosPrivate.post(`/social/comments/post/${postId}`, newComment);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['comments', postId]);
            setCommentText('');
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
        },
    });
    

    const handleAddComment = () => {
        if (commentText.trim()) {
            mutation.mutate({ description: commentText });
        } else {
            console.warn('Comment text is empty or whitespace');
        }
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <TextField
                label="Add a comment"
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                fullWidth
                multiline
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                style={{ marginLeft: '10px' }}
                disabled={mutation.isLoading}
            >
                {mutation.isLoading ? 'Adding...' : 'Add'}
            </Button>
        </Box>
    );
};

export default NewComment;