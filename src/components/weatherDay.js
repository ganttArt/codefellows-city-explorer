import React from 'react';
import { ListGroup } from 'react-bootstrap';

class WeatherDay extends React.Component {
  render() {
    return (
      <ListGroup.Item>{this.props.dayForecast.date} {this.props.dayForecast.description}</ListGroup.Item>
    )
  }
}

export default WeatherDay;