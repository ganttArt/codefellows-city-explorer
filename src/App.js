import React from 'react';
import axios from 'axios';
import './App.css'
import { Jumbotron, Image, Form, Button } from 'react-bootstrap';
import ErrorModal from './components/errorModal';
import Weather from './components/weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      imgSrc: '',
      displayResults: false,
      displayErrorModal: false,
      displayForecast: false,
      errorMessage: '',
      forecast: []
    }
  }

  getWeatherFromBackend = (latitude, longitude) => {
    const SERVER = 'http://localhost:3001';
    axios.get(`${SERVER}/weather?lat=${latitude}&lon=${longitude}`)
      .then(forecast => {
        this.setState({ forecast: forecast.data, displayForecast: true });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ displayErrorModal: true, errorMessage: err.message })
      })
  }

  getLocationInfo = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`;
    await axios.get(url)
      .then(location => {
        this.setState({
          location: location.data[0],
          displayResults: true,
          imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${location.data[0].lat},${location.data[0].lon}&zoom=13`
        });
        this.getWeatherFromBackend(location.data[0].lat, location.data[0].lon);
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ displayErrorModal: true, errorMessage: err.message })
      });
  }

  hideErrorModal = () => { this.setState({ displayErrorModal: false }) }

  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
        <Form onSubmit={this.getLocationInfo}>
          <Form.Group>
            <Form.Control onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="City" />
            <Form.Text className="text-muted">Enter a city name to learn a bit more about it.</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
        {this.state.displayForecast && <Weather forecast={this.state.forecast} />}
        {this.state.displayResults &&
          <>
            <Jumbotron>
              <h1>{this.state.location.display_name}</h1>
              <p>Latitude: {this.state.location.lat}, Longitute: {this.state.location.lon}</p>
              <Image src={this.state.imgSrc} roundedCircle />
            </Jumbotron>
          </>
        }
        <ErrorModal hide={this.hideErrorModal} show={this.state.displayErrorModal} error={this.state.errorMessage} />

      </div>
    )
  }
}

export default App;
