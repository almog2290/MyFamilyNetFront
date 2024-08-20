import React, { useState } from 'react';
import { usePostPrivate } from 'hooks/usePostPrivate';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';


const CreatePageCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {postDataAsync, isPending, error} = usePostPrivate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const page = {
      "title": title,
      "description": description
    }

    postDataAsync('/social/pages', page).then(() => {
      setTimeout(() => {
        navigate('/'); 
      }, 500); // 0.5 seconds delay
    })

  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Please setup the page creation
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
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
        <Button type="submit" variant="contained" color="primary" disabled={isPending}>
        {isPending ? "Creating ..." : "Create Page"}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </>
  );
};

export default CreatePageCard;