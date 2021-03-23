import React from 'react';
import axios from 'axios';
import './App.css'
import { Jumbotron, Image, Form, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      imgSrc: '',
      displayResults: false
    }
  }

  getLocationInfo = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url);
    this.setState({
      location: location.data[0],
      displayResults: true,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${location.data[0].lat},${location.data[0].lon}&zoom=13`
    });
  }

  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
        <Form onSubmit={this.getLocationInfo}>
          <Form.Group>
            <Form.Control onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="City"/>
            <Form.Text className="text-muted">Enter a city name to learn a bit more about it.</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
        {this.state.displayResults &&
          <Jumbotron>
            <h1>{this.state.location.display_name}</h1>
            <p>Latitude: {this.state.location.lat}, Longitute: {this.state.location.lon}</p>
            <Image src={this.state.imgSrc} roundedCircle />
          </Jumbotron>
        }
      </div>
    )
  }
}

export default App;
