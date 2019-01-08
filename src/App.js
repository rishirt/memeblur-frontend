import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '4ab0bf448dbb4b45a11be7d373006990'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input : '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", 
    "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      console.log(response);
    },
    function(err) {
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <div className='flex justify-between'>
          <Logo />
          <Navigation />
        </div>
        <Rank/>
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
