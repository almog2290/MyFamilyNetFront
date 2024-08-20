import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostPrivate } from 'hooks/usePostPrivate';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  Typography 
} from '@mui/material';

const UserDetailsCard = () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  const [formData, setFormData] = useState({
    name: name,
    dob: '',
    language: 'en',
    countryIso2: 'US',
    gender: 'MALE',
  });

  const {postDataAsync, isPending, error} = usePostPrivate();
  const navigate = useNavigate();
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(formData);
    await postDataAsync('/social/users', formData);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Please fill out the following details to complete your profile.
      </Typography>
      <div>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={true}
        />
      </div>
      <div>
        <TextField
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <MenuItem value="en">en</MenuItem>
            <MenuItem value="he">he</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            name="countryIso2"
            value={formData.countryIso2}
            onChange={handleChange}
          >
            <MenuItem value="US">US</MenuItem>
            <MenuItem value="IL">IL</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="MALE">MALE</MenuItem>
            <MenuItem value="FEMALE">FEMALE</MenuItem>
            <MenuItem value="OTHER">OTHER</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {isPending && <div>Submitting...</div>}
      {error && <div>{error}</div>}
    </form>
  );
};

export default UserDetailsCard;