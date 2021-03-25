import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';

class Location extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>{this.props.location.display_name}</h1>
        <p>Latitude: {this.props.location.lat}, Longitute: {this.props.location.lon}</p>
        <Image src={this.props.imgSrc} roundedCircle />
      </Jumbotron>
    )
  }
}

export default Location;
