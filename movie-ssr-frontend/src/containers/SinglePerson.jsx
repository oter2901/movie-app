import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "../axios";

const mapOptions = (movies) =>
  movies.map((movie) => ({
    key: movie.id,
    text: movie.title,
    value: movie.id,
  }));
const SingleMovie = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    alias: "",
    person_roles: [],
  });
  const history = useHistory();
  const fetchPerson = async (id) => {
    try {
      const response = await axios(`api/v1/persons/${id}`);
      return setPerson({ ...person, ...response.data });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMovies = async () => {
    try {
      const response = await axios("api/v1/movies/");
      return setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPerson(match.params.id);
    fetchMovies();
  }, []);

  const handleChange = (target) => {
    return setPerson((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleDropDownChange = (value, role) => {
    return setPerson((prevState) => ({
      ...prevState,
      person_roles: prevState.person_roles.concat({
        movie_id: value,
        role_type: role,
      }),
    }));
  };

  const handleSubmit = async () => {
    try {
      const { id, ...rest } = person;
      await axios.put(`api/v1/persons/${id}`, {
        person: rest,
      });
      history.push("/");
    } catch (err) {
      history.push("/signin");
    }
  };
  const handleDeleteMovie = async () => {
    try {
      await axios.delete(`api/v1/persons/${person.id}`);
      history.push("/");
    } catch (err) {
      history.push("/signin");
    }
  };
  const options = !!movies && mapOptions(movies);
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }} centered>
        <Header as="h2">Person</Header>
        <Form size="large">
          <Segment>
            <Form.Input
              label="First name"
              value={person && person.first_name}
              onChange={(e) => handleChange(e.target)}
              name="first_name"
              fluid
              placeholder="Jhon"
            />
            <Form.Input
              label="Last name"
              onChange={handleChange}
              value={person && person.last_name}
              name="lastname"
              fluid
              placeholder="Doe"
            />
            <Form.Input
              label="Alias"
              onChange={handleChange}
              value={person && person.alias}
              name="alias"
              fluid
              placeholder="The Claw"
            />
            <Form.Dropdown
              clearable
              label="Casting"
              onChange={(e, { value }) => handleDropDownChange(value, "ACTOR")}
              closeOnChange
              fluid
              multiple
              options={options}
              selection
            />
            <Form.Dropdown
              clearable
              closeOnChange
              onChange={(e, { value }) =>
                handleDropDownChange(value, "DIRECTOR")
              }
              label="Directors"
              fluid
              multiple
              options={options}
              selection
            />
            <Form.Dropdown
              clearable
              closeOnChange
              label="Producers"
              onChange={(e, { value }) =>
                handleDropDownChange(value, "PRODUCER")
              }
              fluid
              multiple
              options={options}
              selection
            />
            <div>
              <Button
                negative
                icon="delete"
                attached="left"
                onClick={() => handleDeleteMovie()}
              />
              <Button positive attached="right" onClick={() => handleSubmit()}>
                Update
              </Button>
            </div>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SingleMovie;
