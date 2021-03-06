import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import Movie from './movie';

class Movies extends React.Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">See movies related to this location</Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup>
                {this.props.movies.map(movie => (
                  <Movie movie={movie} />
                ))}
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}

export default Movies;
