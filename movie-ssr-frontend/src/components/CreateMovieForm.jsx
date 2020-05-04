import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "../axios";

export const PeopleDropdown = ({ placeholder, people, setPeople }) => {
  return (
    <Form.Dropdown
      label={placeholder}
      placeholder={placeholder}
      fluid
      multiple
      selection
      onChange={(e, { value }) => setPeople(value)}
      options={people}
    />
  );
};

export const mapOptions = (people) =>
  people.map((person) => ({
    key: person.id,
    text: `${person["first_name"]} ${person["last_name"]}`,
    value: { person_id: person.id },
  }));
const CreateMovieForm = ({ people }) => {
  const [show, setShow] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [casting, setCasting] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(mapOptions(people));
  }, [people]);
  const history = useHistory();
  const handleSubmit = async () => {
    try {
      await axios.post("api/v1/movies", {
        movie: {
          title: movieTitle,
          release_year: releaseYear,
          casting,
          directors,
          producers,
        },
      });
      setShow(!show);
    } catch (err) {
      history.push("/signin");
    }
  };
  return (
    <Modal
      textAlign="center"
      open={show}
      size="small"
      trigger={<Button onClick={() => setShow(!show)}>Create Movie</Button>}
    >
      <Modal.Header textAlign="center">Create a new movie</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form size="small" onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              name="title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="Movie title"
            />
            <Form.Input
              label="Release Year"
              onChange={(e) => setReleaseYear(e.target.value)}
              value={releaseYear}
              name="release_year"
              placeholder="Release Year"
              type="number"
            />
            {!!people && (
              <>
                <PeopleDropdown
                  placeholder={"Casting"}
                  people={options}
                  setPeople={setCasting}
                />
                <PeopleDropdown
                  placeholder="Directors"
                  people={options}
                  setPeople={setDirectors}
                />
                <PeopleDropdown
                  placeholder="Producers"
                  people={options}
                  setPeople={setProducers}
                />
              </>
            )}
            <Button positive centered size="large" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateMovieForm;
