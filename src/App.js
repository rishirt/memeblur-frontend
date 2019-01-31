import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      faces: [],
      route: 'signin',
      isSignedIn : false
    }
  }

  onInputChange = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  calculateFaceParams = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    }
  }

  calculateFaceLocation = (data) => {
    var i;
    var faces = [];
    const length = data.outputs[0].data.regions.length;
    for(i=0 ; i < length ; i++){
      faces[i] = this.calculateFaceParams(data.outputs[0].data.regions[i].region_info.bounding_box);
    }
    return faces ;
  }

  displayFaceBox = (faces) => {
    this.setState({
      faces : faces
    });
  };

  onButtonSubmit = () => {
    this.setState({
      imageUrl : this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  

  render() {
    const {isSignedIn,route,faces,imageUrl} = this.state
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div className = 'flex justify-between'>
          <Logo/>
          <Navigation 
          onRouteChange = {this.onRouteChange}
          isSignedIn = {isSignedIn}/>
        </div>
        {
          route === 'home'
          ? <div>
              <Rank />
              <ImageLinkForm 
                onInputChange = {this.onInputChange}
                onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition 
                faces = {faces}
                imageUrl = {imageUrl}
              />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange = {this.onRouteChange}/>
            : <Register onRouteChange = {this.onRouteChange}/>
          )
        }       
      </div>
    );
  }
}

export default App;
