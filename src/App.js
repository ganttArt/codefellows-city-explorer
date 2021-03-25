import React from 'react';
import axios from 'axios';
import './App.css'
import ErrorModal from './components/errorModal';
import Weather from './components/weather';
import Movies from './components/movies';
import Location from './components/location';
import CityForm from './components/cityForm';

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
      displayMovies: false,
      errorMessage: '',
      forecast: [],
      movies: [],
    }
  }

  getWeatherFromBackend = (latitude, longitude) => {
    const SERVER = process.env.REACT_APP_BACKEND_SERVER;
    axios.get(`${SERVER}/weather?lat=${latitude}&lon=${longitude}`)
      .then(forecast => {
        this.setState({ forecast: forecast.data, displayForecast: true });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ displayErrorModal: true, errorMessage: err.message })
      })
  }

  getMoviesFromBackend = (location) => {
    const SERVER = process.env.REACT_APP_BACKEND_SERVER;
    axios.get(`${SERVER}/movies?location=${location}`)
      .then(movies => {
        this.setState({ movies: movies.data, displayMovies: true });
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
        this.getMoviesFromBackend(this.state.searchQuery);
        console.log('get location info function');
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ displayErrorModal: true, errorMessage: err.message })
      });
  }

  hideErrorModal = () => { this.setState({ displayErrorModal: false })}
  updateSearchQuery = (query) => { this.setState({ searchQuery: query})}

  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
        <CityForm getLocationInfo={this.getLocationInfo} updateSearchQuery={this.updateSearchQuery} />
        {this.state.displayForecast && <Weather forecast={this.state.forecast} />}
        {this.state.displayMovies && <Movies movies={this.state.movies} />}
        {this.state.displayResults && <Location location={this.state.location} imgSrc={this.state.imgSrc} />}
        <ErrorModal hide={this.hideErrorModal} show={this.state.displayErrorModal} error={this.state.errorMessage} />
      </div>
    )
  }
}

export default App;
