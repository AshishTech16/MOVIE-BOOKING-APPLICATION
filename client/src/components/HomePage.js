import React, { useEffect, useState} from "react"
import { Box, Button, Typography } from "@mui/material";
import MovieItem from './Movies/MovieItem'
import { Link } from "react-router-dom";
import { getAllMovie } from '../Api-helpers/api-helpers'
import Carousel from "react-material-ui-carousel";

const Homepage = () => {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    getAllMovie()
      .then((data) => setmovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  
  const items = [
    {
      img: "https://www.koimoi.com/wp-content/new-galleries/2023/04/priyanka-chopra-jonas-was-better-than-mcu-stars-robert-downey-jr-chris-evans-revealed-citadel-director-joe-russo-01.jpg",
    },
    {
      img: "https://www.5dariyanews.com/Uploads/2022/12/21/en-news-12512653-january-2023-movies-large.jpg",
    },
    {
      img: "https://prod.assets.earlygamecdn.com/images/marvel2023.png?mtime=1673535586",
    },
  ];

  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Carousel autoPlay={true} interval={3000} animation={"slide"}>
        {items.map((item, index) => (
          <Box
            margin={"auto"}
            width={"70%"}
            height={"40vh"}
            padding={2}
            key={index}
          >
            <img
              src={item.img}
              alt="movie-banner"
              width={"100%"}
              height={"100%"}
            />
          </Box>
        ))}
      </Carousel>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h5" textAlign={"center"}>
          Latest Release
        </Typography>
        <Box
          display="flex"
          margin="auto"
          width="80%"
          justifyContent={"center"}
          flexWrap="wrap"
        >
          {movies && movies.slice(0,6).map((item,index)=>
        <MovieItem id={item._id} title={item.title} posterUrl={item.posterUrl} releaseDate={item.releaseDate} key={index}/>
       )}
        </Box>
        <Box display="flex" padding={5} margin="auto">
          <Button
            LinkComponent={Link}
            to="/movies"
            variant="outlined"
            sx={{ margin: "auto", color: "#2b2d32" }}
          >
            View All Movies
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="auto"
        paddingY={3}
        bgcolor="#2B2D32"
        color="#FFF"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="auto"
          height={50}
          bgcolor="#2B2D32"
          color="#FFF"
        >
          <Typography variant="subtitle1" align="center" sx={{ pr: 2 }}>
            ALL RIGHTS ARE RESERVED BY THE OWNER.
          </Typography>
          <Typography variant="subtitle2" align="center">
            &copy; 2023. MADE BY ASHISH KUMAR.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
