import React, { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "../axios";
import MoviesList from "../components/MoviesList";

function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMovies = async () => {
    const response = await axios.get("api/v1/movies");
    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Movies List</Header>

      {loading ? (
        <Header as="h2">LOADING...</Header>
      ) : (
        <MoviesList movies={data} />
      )}
    </Container>
  );
}

export default Movies;
