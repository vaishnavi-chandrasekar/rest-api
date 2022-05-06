import React, { useState } from "react";
import "./App.css";

const Movies = () => {
  const [search, setSearch] = useState(false);
  const [message, setMessage] = useState(null);
  const [Title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    setSearch(true);
    const url = `https://jsonmock.hackerrank.com/api/movies?Title=${Title}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMessage(null);
      setMovies(data.data); // needs check
      setSearch(false);
    } catch (err) {
      setMessage("Unexpected Error happened");
      setSearch(false);
    }
  };

  return (
    <div className="App">
      <form action="" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Enter a Movie"
          name="year"
          value={Title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button type="submit" >Search</button>
      </form>

      <div className="movies-container">
        {search && !message ? (
          <span>Loading...</span>
        ) : message ? (
          <div className="message"> {message} </div>
        ) : (
          movies.map((movie) => (
            <li key={movie.imdbID}>
              {" "}
              <b>Title:</b> {movie.Title}  <b>Year: </b>{movie.Year}  <b>imdbID:</b> {movie.imdbID}
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
