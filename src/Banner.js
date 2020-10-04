import React, { useState, useEffect } from "react";
import axios from "./axois";
import requests from "./requests";
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroungPosition: "center center"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie.title ? movie.title : (movie.name ? movie.name : movie.original_name)}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_desc">{movie.overview}</h1>
      </div>
      <div className="banner_bottom"></div>
    </header>
  );
}

export default Banner;
