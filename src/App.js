import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div>
    <h1>{props.CityName}</h1>
  </div>);
}

function ZipSearchField(props) {
  return (
  <div>
    <form>
      <label>Zip Code</label>
      <input onChange={props.changeHandler} type="text" className="form-control"/>
    </form>
  </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }

  zipCodeChanged(event) {
    console.log(event.target.value);

    if(event.target.value.length !== 5) {
      this.setState({cities: []});
      return;
    }

    let url = "http://ctp-zip-api.herokuapp.com/zip/" + event.target.value;

    fetch(url)
      .then((response) => {
        console.log(response.status);

        if(response.status === 200) {
          return response.json();
        }
        else {
          throw "Not Found";
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({cities: jsonData});
      })
      .catch((error) => {
        console.log(error);
        this.setState({cities: []})
      })
  }

  render() {
    let cityComps = [];

    for(let i = 0; i < this.state.cities.length; i++) {
      let item = this.state.cities[i];
      cityComps.push(<City CityName={item.City} />);
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField changeHandler={(e) => this.zipCodeChanged(e)} />
        <div>
          {cityComps}
        </div>
      </div>
    );
  }
}

export default App;
