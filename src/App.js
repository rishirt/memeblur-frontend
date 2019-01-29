import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank'
import './App.css';

const app = new Clarifai.App({
 apiKey: 'd47bed7952604b74824e9dc607600f39'
});

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  onButtonSubmit = () => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }
  

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div className = 'flex justify-between'>
          <Logo/>
          <Navigation/>
        </div>
        <Rank />
        <ImageLinkForm 
        onInputChange = {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
