import React from 'react';
import { Form, Button } from 'react-bootstrap';

class CityForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.getLocationInfo}>
        <Form.Group>
          <Form.Control onChange={(e) => this.props.updateSearchQuery(e.target.value)} placeholder="City" />
          <Form.Text className="text-muted">Enter a city name to learn a bit more about it.</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">Explore!</Button>
      </Form>
    )
  }
}

export default CityForm;
