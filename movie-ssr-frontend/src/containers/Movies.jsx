import React, { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "../axios";
import CreateMovieForm from "../components/CreateMovieForm";
import MoviesList from "../components/MoviesList";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const moviesData = await axios.get("api/v1/movies");
      const personsData = await axios.get("api/v1/persons");
      setMovies(moviesData.data);
      setPersons(personsData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Movies List</Header>
      {localStorage.getItem("TOKEN") && (
        <CreateMovieForm persons={persons} style={{ marginTop: "7em" }} />
      )}
      {loading && movies ? (
        <Header as="h2">LOADING...</Header>
      ) : (
        <MoviesList movies={movies} persons={persons} />
      )}
    </Container>
  );
}

export default Movies;
