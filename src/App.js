import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', //should get displayed when button submit is clicked
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    //finalizes the input as the chosen iamgeUrl
    this.setState({imageUrl: this.state.input});
    const USER_ID = 'buipj1i9q5ps';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'e05c24dcc15942f5905ebdaef68d1505';
    const APP_ID = '7501446225b747c395a14c9c2c2f25a0';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }//end of onButtonClick

  render () {
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [1, 1],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [0.2, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random"],
      cross: "dead", // cross or bround
      random: 15,  // or null,
      g: 5,    // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(particle.p.x, particle.p.y, particle.radius * 1, particle.radius * 1);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
      }
    };
  return (
    <div className="App">
        <ParticlesBg className="particles" color="#456CFF" config={config} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
        />
    </div>
    );
  }
}

export default App;
