import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Icon, List } from "semantic-ui-react";
const PersonsAccordion = ({ name, people, isActive, handleClick }) => {
  return (
    <>
      <Accordion.Title active={isActive} index={0} onClick={handleClick}>
        <Icon name="dropdown" />
        {name}
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        <List>
          {people.map((person) => (
            <List.Item key={person.id}>
              <List.Icon name="users" />
              <List.Content>
                <Link
                  to={`/people/${person.id}`}
                >{`${person["first_name"]} ${person["last_name"]}`}</Link>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </>
  );
};

const MovieCard = ({ movie, people }) => {
  const [activeIndex, setActiveIndex] = useState();
  const filterValues = (key) =>
    people.length &&
    people.filter((person) => person[key].indexOf(movie.id) !== -1);
  const casting = filterValues("movies_as_actor");
  const directors = filterValues("movies_as_director");
  const producers = filterValues("movies_as_producer");
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
              people={casting}
            />
          )}
          {!!directors.length && (
            <PersonsAccordion
              name="Directors"
              isActive={activeIndex === 1}
              handleClick={() => setActiveIndex(1)}
              people={directors}
            />
          )}
          {!!producers.length && (
            <PersonsAccordion
              name="Producers"
              isActive={activeIndex === 2}
              handleClick={() => setActiveIndex(2)}
              people={producers}
            />
          )}
        </Accordion>
      </Card.Content>
    </Card>
  );
};
function MoviesList({ movies, people }) {
  return (
    <Card.Group centered>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} people={people} />;
      })}
    </Card.Group>
  );
}

export default MoviesList;
