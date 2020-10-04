import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseurl = " https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const handleClick = (movie) => {
        console.log(movie);
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie.name ? movie.name : (movie.title ? movie.title : movie.original))
                .then(url => {
                    const urlparam = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlparam.get("v"));
                }).catch(error => {
                    console.log(error);
                });
        }
    }


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => {
                    return <img onClick={() => handleClick(movie)} key={movie.id} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                })}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;