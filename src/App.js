import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';

window.process = {
  env: {
      NODE_ENV: 'development'
  }
} 

const initialState = {
  input: '',
  imageUrl: '', //should get displayed when button submit is clicked
  box: {}, //contain values received from bounding_box
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
//changes empty user state to the data passed
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    //bounding_box is percentage of the image 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage'); //grabs image
    const width = Number(image.width);   //width of img
    const height = Number(image.height); //height of img
    //returns an object that will fill the box state object
    return {
      leftCol: clarifaiFace.left_col * width, //where left column
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://frozen-eyrie-32291.herokuapp.com/imageurl", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input,
        })
      }).then(res => res.json()).then(res => {
        console.log(res);
        if (res) {
          fetch('https://frozen-eyrie-32291.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(res));
        console.log(res);
    }).catch(error => console.log('error', error));
      //END OF CLARIFAI REST API
  }//end of onButtonClick

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const {isSignedIn, imageUrl, route, box } = this.state;
    let config = {
      num: [2, 7],
      rps: 0.1,
      radius: [0.5, 0.6],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.1, 0],
      scale: [0.1, 0.1],
      position: "all", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random"],
      cross: "cross", // cross or bround
      random: 15,  // or null,
      g: 10,    // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(particle.p.x, particle.p.y, particle.radius * 0, particle.radius * 1);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
      }
    };
  return (
    <div className="App">
        <ParticlesBg className="particles" color="#FFF6C4" config={config} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div> 
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}  />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={box}
                imageUrl={imageUrl} />
            </div>
          : (
              route === 'signin'
            ? <Signin 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} />
            : <Register 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} />
          ) 
        }
    </div>
    );
  }
}

export default App;
