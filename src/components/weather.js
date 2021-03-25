import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import WeatherDay from './weatherDay';

class Weather extends React.Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">See the Forecast</Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup>
                {this.props.forecast.map(dayForecast => (
                  <WeatherDay dayForecast={dayForecast} />
                ))}
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}

export default Weather;
