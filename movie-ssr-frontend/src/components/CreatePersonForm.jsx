import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "../axios";

export const mapOptions = (persons) =>
  persons.map((person) => ({
    key: person.id,
    text: `${person["first_name"]} ${person["last_name"]}`,
    value: { person_id: person.id },
  }));
const CreatePersonForm = ({ persons, movies }) => {
  const [show, setShow] = useState(false);
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    alias: "",
    person_roles: [],
  });

  const history = useHistory();
  const handleSubmit = async () => {
    try {
      await axios.post("api/v1/persons", {
        person,
      });
      setShow(!show);
    } catch (err) {
      history.push("/signin");
    }
  };

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

  const mapOptions = (movies) => {
    return movies.map((movie) => ({
      key: movie.id,
      text: movie.title,
      value: movie.id,
    }));
  };

  return (
    <Modal
      textAlign="center"
      open={show}
      size="small"
      trigger={<Button onClick={() => setShow(!show)}>Create Person</Button>}
    >
      <Modal.Header textAlign="center">Create a new person</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form size="small" onSubmit={handleSubmit}>
            <Form.Input
              label="Fist name"
              name="first_name"
              value={person && person.first_name}
              onChange={(e) => handleChange(e.target)}
              placeholder="Jhon"
            />
            <Form.Input
              label="Last name"
              name="last_name"
              value={person && person.last_name}
              onChange={(e) => handleChange(e.target)}
              placeholder="Doe"
            />
            <Form.Input
              label="Alias"
              name="alias"
              value={person && person.alias}
              onChange={(e) => handleChange(e.target)}
              placeholder="The Claw"
            />

            {!!movies && (
              <>
                <Form.Dropdown
                  clearable
                  label="Person as Actor"
                  onChange={(e, { value }) =>
                    handleDropDownChange(value, "ACTOR")
                  }
                  closeOnChange
                  fluid
                  multiple
                  options={mapOptions(movies)}
                  selection
                />
                <Form.Dropdown
                  clearable
                  closeOnChange
                  onChange={(e, { value }) =>
                    handleDropDownChange(value, "DIRECTOR")
                  }
                  label="Person as Director"
                  fluid
                  multiple
                  options={mapOptions(movies)}
                  selection
                />
                <Form.Dropdown
                  clearable
                  closeOnChange
                  label="Person as Producer"
                  onChange={(e, { value }) =>
                    handleDropDownChange(value, "PRODUCER")
                  }
                  fluid
                  multiple
                  options={mapOptions(movies)}
                  selection
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

export default CreatePersonForm;
