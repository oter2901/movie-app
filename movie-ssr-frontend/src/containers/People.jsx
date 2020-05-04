import React, { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "../axios";
import CreatePersonForm from "../components/CreatePersonForm";
import PeopleList from "../components/PeopleList";

function People() {
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
  console.log(people);
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Persons List</Header>
      {localStorage.getItem("TOKEN") && (
        <CreatePersonForm movies={movies} style={{ marginTop: "7em" }} />
      )}

      {loading && people ? (
        <Header as="h2">LOADING...</Header>
      ) : (
        <PeopleList movies={movies} people={people} />
      )}
    </Container>
  );
}

export default People;
