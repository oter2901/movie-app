import React, { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "../axios";
import CreateMovieForm from "../components/CreateMovieForm";
import MoviesList from "../components/MoviesList";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const moviesData = await axios.get("api/v1/movies");
      const peopleData = await axios.get("api/v1/persons");
      setMovies(moviesData.data);
      setPeople(peopleData.data);
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
        <CreateMovieForm people={people} style={{ marginTop: "7em" }} />
      )}
      {loading && movies ? (
        <Header as="h2">LOADING...</Header>
      ) : (
        <MoviesList movies={movies} people={people} />
      )}
    </Container>
  );
}

export default Movies;
