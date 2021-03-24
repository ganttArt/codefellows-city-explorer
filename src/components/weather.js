import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weather: []
    };
  }

  componentDidMount = async() => {
    const SERVER = 'http://localhost:3001';
    const shopping = await axios.get(`${SERVER}/weather`);
    // ?lat=-33.87&lon=151.21
    console.log(shopping);
  }

  render() {
    return (
      <h1>{this.state.weather}</h1>
    )
  }
}

export default Weather;
