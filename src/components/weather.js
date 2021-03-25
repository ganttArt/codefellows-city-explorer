import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';

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
                  <ListGroup.Item>{dayForecast.date} {dayForecast.description}</ListGroup.Item>
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
