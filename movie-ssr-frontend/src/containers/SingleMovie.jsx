import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "../axios";

const mapOptions = (persons) =>
  persons.map((person) => ({
    key: person.id,
    text: `${person["first_name"]} ${person["last_name"]}`,
    value: { person_id: person.id },
  }));
const SingleMovie = ({ match }) => {
  const [movie, setMovie] = useState();
  const [persons, setPersons] = useState([]);
  const history = useHistory();
  const fetchMovie = async (id) => {
    try {
      const response = await axios(`api/v1/movies/${id}`);
      return setMovie(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPersons = async () => {
    try {
      const response = await axios("api/v1/persons/");
      return setPersons(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMovie(match.params.id);
    fetchPersons();
  }, []);

  const handleChange = (target) => {
    return setMovie((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleDropDownChange = (value, property) => {
    return setMovie((prevState) => ({ ...prevState, [property]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { id, ...rest } = movie;
      await axios.put(`api/v1/movies/${id}`, {
        movie: rest,
      });
      history.push("/");
    } catch (err) {
      history.push("/signin");
    }
  };
  const handleDeleteMovie = async () => {
    try {
      await axios.delete(`api/v1/movies/${movie.id}`);
      history.push("/");
    } catch (err) {
      history.push("/signin");
    }
  };

  return (
    <Grid style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Movie
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              label="Movie Title"
              value={movie && movie.title}
              onChange={(e) => handleChange(e.target)}
              name="title"
              fluid
              placeholder="Movie Title"
            />
            <Form.Input
              label="Release year"
              onChange={handleChange}
              value={movie && movie.release_year}
              name="release_year"
              fluid
              placeholder="Release year"
              type="number"
            />
            <Form.Dropdown
              clearable
              label="Casting"
              onChange={(e, { value }) =>
                handleDropDownChange(value, "casting")
              }
              closeOnChange
              fluid
              multiple
              options={mapOptions(persons)}
              selection
            />
            <Form.Dropdown
              clearable
              closeOnChange
              onChange={(e, { value }) =>
                handleDropDownChange(value, "directors")
              }
              label="Directors"
              fluid
              multiple
              options={mapOptions(persons)}
              selection
            />
            <Form.Dropdown
              clearable
              closeOnChange
              label="Producers"
              onChange={(e, { value }) =>
                handleDropDownChange(value, "producers")
              }
              fluid
              multiple
              options={mapOptions(persons)}
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
