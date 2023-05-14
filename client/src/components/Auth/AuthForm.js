import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const labelStyle = { mt: 1, mb: 2 };


const AuthForm = ({ onSubmit, isAdmin }) => {
  const navigate = useNavigate();
  const crossHandler = () => {
      navigate("/")
  };
  
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.email,
      [e.target.password]: e.target.password
    }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({inputs, signup: isAdmin ? false : isSignup });  // if isAdmin is true then isSignup will not happen by default isAdmin is true Here.
  };

  return (
    <Dialog paperProps={{ style: { borderRadius: 20 } }} open={true}>

      <Box sx={{ ml: 'auto', padding: 1 }}>
        <IconButton  onClick={crossHandler}>
          <ClearIcon />
        </IconButton>
      </Box>

      <Typography variant='h4' textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={'flex'} justifyContent={'center'}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={'center'}
        >
          {!isAdmin && isSignup && (   // If isAdmin is true then isSignup will not happen.
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant='standard'
                type={'text'}
                name="name"
              />
            </>
          )}

          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant='standard'
            type={'email'}
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant='standard'
            type={'password'}
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type='submit'
            fullWidth variant='contained'>
            {isSignup ? "Signup" : "Login"}
          </Button>

          {!isAdmin && (  // if isAdmin is true don't render this data
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch to {isSignup ? "Login" : "Signup"}
            </Button>
          )}

        </Box>
      </form>
    </Dialog>
  )
}

export default AuthForm;
