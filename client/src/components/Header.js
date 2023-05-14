import React, { useEffect, useState } from 'react'
import {AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar} from '@mui/material'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { getAllMovie } from '../Api-helpers/api-helpers';
import { Link } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovie().then((data)=>{
      setMovies(data.movies);
    })
    .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin?adminActions.logout():userActions.logout());
  }
 return (
   <AppBar position='sticky' sx={{bgcolor: "#3B3B3B"}}>
     <Toolbar>
     <Box width={'20%'}>
     <IconButton LinkComponent={Link} to="/" >
     <MovieFilterIcon/>
      </IconButton>

     
     </Box>
     <Box width={'30%'} margin={"auto"}>
     <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={movies.map((option) => option.title)}
        renderInput={(params) =>(
         <TextField 
         sx={{input: {color: "white"}}} 
         variant='standard'  {...params}
         placeholder = "Search Multiple Movies Across" />
         )}
      />
     </Box>
     <Box display={'flex'}>
     <Tabs textColor='white' indicatorColor='secondary' value={value}
     onChange={(e,value)=>{setValue(value)}}
     >
      <Tab LinkComponent={Link} to="/movies" label="Movies" />
        {/* if user or admin is login then don't show these */}
      { !isAdminLoggedIn && !isUserLoggedIn && ( <>
        <Tab LinkComponent={Link} to="/auth" label="Login" />
        <Tab LinkComponent={Link} to="/admin" label="Admin" /> 
        </>
        )}
        {isUserLoggedIn && (
          <>
            <Tab LinkComponent={Link} to="/user"
             label="Profile"/>
            <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/" label="Logout"/>
          </>
        )}
        {isAdminLoggedIn && (
          <>
            <Tab LinkComponent={Link} to="/add" label="ADD MOVIES"/>
            <Tab LinkComponent={Link} to="/user-admin" label="Profile"/>
            <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/" label="Logout"/>
          </>
        )}  
        
      
     </Tabs>

     </Box>
     </Toolbar>
   </AppBar>

  )
}

export default Header
