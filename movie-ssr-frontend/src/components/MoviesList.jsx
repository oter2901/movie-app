import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Icon, List } from "semantic-ui-react";
const PersonsAccordion = ({ name, persons, isActive, handleClick }) => {
  return (
    <>
      <Accordion.Title active={isActive} index={0} onClick={handleClick}>
        <Icon name="dropdown" />
        {name}
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        <List>
          {persons.map((person) => (
            <List.Item key={person.id}>
              <List.Icon name="users" />
              <List.Content>
                <Link
                  to={`/persons/${person.id}`}
                >{`${person["first_name"]} ${person["last_name"]}`}</Link>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </>
  );
};
const MovieCard = ({ movie, persons }) => {
  const [activeIndex, setActiveIndex] = useState();
  const casting = persons.filter(
    (person) => person["movies_as_actor"].indexOf(movie.id) !== -1
  );
  const directors = persons.filter(
    (person) => person["movies_as_director"].indexOf(movie.id) !== -1
  );
  const producers = persons.filter(
    (person) => person["movies_as_producer"].indexOf(movie.id) !== -1
  );
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </Card.Header>
        <Card.Meta>Release year: {movie.release_year}</Card.Meta>
        <Accordion>
          {!!casting.length && (
            <PersonsAccordion
              name="Casting"
              isActive={activeIndex === 0}
              handleClick={() => setActiveIndex(0)}
              persons={casting}
            />
          )}
          {!!directors.length && (
            <PersonsAccordion
              name="Directors"
              isActive={activeIndex === 1}
              handleClick={() => setActiveIndex(1)}
              persons={directors}
            />
          )}
          {!!producers.length && (
            <PersonsAccordion
              name="producers"
              isActive={activeIndex === 2}
              handleClick={() => setActiveIndex(2)}
              persons={producers}
            />
          )}
        </Accordion>
      </Card.Content>
    </Card>
  );
};
function MoviesList({ movies, persons }) {
  return (
    <Card.Group centered>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} persons={persons} />;
      })}
    </Card.Group>
  );
}

export default MoviesList;
