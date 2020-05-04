import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Icon, List } from "semantic-ui-react";
const MoviesAccordion = ({ name, movies, isActive, handleClick }) => {
  return (
    <>
      <Accordion.Title active={isActive} index={0} onClick={handleClick}>
        <Icon name="dropdown" />
        {name}
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        <List>
          {movies.map((movie) => (
            <List.Item key={movie.id}>
              <List.Content>
                <Link to={`/movies/${movie.id}`}>{`${movie.title}`}</Link>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </>
  );
};
const PersonCard = ({ person, movies }) => {
  const [activeIndex, setActiveIndex] = useState();
  const filterValues = (key) =>
    movies.length &&
    movies.filter((movie) => movie[key].indexOf(person.id) !== -1);

  const moviesAsActor = filterValues("casting");
  const moviesAsDirector = filterValues("directors");
  const moviesAsProducer = filterValues("producers");

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link
            to={`/people/${person.id}`}
          >{`${person.first_name} ${person.last_name}`}</Link>
        </Card.Header>
        <Card.Meta>Alias: {person.alias}</Card.Meta>
        <Accordion>
          {!!moviesAsActor.length && (
            <MoviesAccordion
              name="Movies as Actor or Actress"
              isActive={activeIndex === 0}
              handleClick={() => setActiveIndex(0)}
              movies={moviesAsActor}
            />
          )}
          {!!moviesAsDirector.length && (
            <MoviesAccordion
              name="Movies as Director"
              isActive={activeIndex === 1}
              handleClick={() => setActiveIndex(1)}
              movies={moviesAsDirector}
            />
          )}
          {!!moviesAsProducer.length && (
            <MoviesAccordion
              name="Movies as Producer"
              isActive={activeIndex === 2}
              handleClick={() => setActiveIndex(2)}
              movies={moviesAsProducer}
            />
          )}
        </Accordion>
      </Card.Content>
    </Card>
  );
};
function PeopleList({ movies, people }) {
  return (
    <Card.Group centered>
      {people.map((person) => {
        return <PersonCard key={person.id} person={person} movies={movies} />;
      })}
    </Card.Group>
  );
}

export default PeopleList;
