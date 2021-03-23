import React from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      displayResults: false
    }
  }

  getLocationInfo = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.location}&format=json`;
    const location = await axios.get(url);
    this.setState({
      location: location.data[0],
      displayResults: true,
    });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.getLocationInfo} >
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="City" />
          <button type="submit">Explore!</button>
        </form>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
        </Jumbotron>
        {this.state.displayResults &&
          <>
            <h2>{this.state.location.display_name}</h2>
          </>
        }
      </div>
    )
  }
}

export default App;
