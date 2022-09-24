import {useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=6acd768d';

const movie1 = {
        "Title": "Superman III",
        "Year": "1983",
        "imdbID": "tt0086393",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Star Wars')
    }, []);

    return (
        <div className="app">
            <h1>LaVoyMovie</h1>

            <div className="search">
                <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
              ?(
                <div className="container">
                  {movies.map((movie)=> (
                    <MovieCard movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
              ) 
            }            
        </div>
    );
}

export default App;