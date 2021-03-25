import React from 'react';
import { ListGroup } from 'react-bootstrap';

class Movie extends React.Component {
  render() {
    return (
      <ListGroup.Item>{this.props.movie.title}: {this.props.movie.description}</ListGroup.Item>
    )
  }
}

export default Movie;
