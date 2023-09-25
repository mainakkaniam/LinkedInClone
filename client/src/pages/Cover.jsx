import React, { useState } from 'react';
import "../sass/Cover.scss";
import image from "../assets/cover.png";
import { Button, TextField } from '@mui/material';
import Avatar from 'react-avatar-edit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const Cover = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState(''); // Initialize with an empty string
  const [description, setDescription] = useState(''); // Initialize with an empty string

  const src = '';

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (newPreview) => {
    setPreview(newPreview);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 1000000) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };

  const handleNameChange = (event) => {
    // Update the name state when the user types in the name field
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    // Update the description state when the user types in the description field
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Create the request body
        const requestBody = {
          image: preview,
          name: name,
          body:description // Assuming user.uid contains the user's unique ID
        };
        // Make a POST request using the Fetch API
        fetch(`http://localhost:3001/api/users/${user.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }).then((reponse) => {
          toast.success("User profile updated successfully!")
          navigate("/home");
        })
          .catch((error) => {
           toast.error("Error while updating user profile!")
          });
      }
    })
  }

  return (
    <div className="cover">
      <img src={image} alt="" />
      <div className="user-info">
        <div className="welcome">
          <p style={{ fontSize: "40px" }}>Welcome</p>
          <p style={{ fontSize: "25px" }}>We will need some more info to continue!</p>
        </div>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          sx={{
            width: "400px",
          }}
          value={name} // Bind the value to the name state
          onChange={handleNameChange} // Handle changes to the name field
        />
        <Avatar
          width={400}
          height={200}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          label="Upload your Profile Picture"
          src={src}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          sx={{
            width: "400px"
          }}
          value={description} // Bind the value to the description state
          onChange={handleDescriptionChange} // Handle changes to the description field
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit}>SUBMIT</Button>
      </div>
    </div>
  );
};

export default Cover;
