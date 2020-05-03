import React from "react";
import { Container, Header } from "semantic-ui-react";

class Persons extends React.Component {
  render() {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Persons List</Header>
      </Container>
    );
  }
}

export default Persons;