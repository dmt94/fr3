import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Entry from './components/Entry/Entry';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';
import Footer from './components/Footer/Footer';

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
    joined: '',
    faceCount: 0,
    celebrityCount: 0
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
      joined: data.joined,
      faceCount: 0,
      celebrityCount: 0
    }})
  }

  calculateFaceLocation = (data) => {
    //bounding_box is percentage of the image 
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage'); //grabs image
    const width = Number(image.width);   //width of img
    const height = Number(image.height); //height of img
    //returns an object that will fill the box state object

    /* we are using the image width and height as reference to place the bounding box
    since we are grabbing multiple faces in a photo (possibly), 
    we need to return an array of objects, where each object in the array is the "person/face"
    Each element should have:
    - name of celebrity (add condition where value > 0.03) for celebrity name to get added
    - [{
        celebrityName: '', 
        leftCol: ..., etc.
      }]

    > use .forEach on clarifaiFace to set the key-value pairs for each object
    */
   const arrayOfPeople = [];
   clarifaiFace.forEach(person => {
    arrayOfPeople.push(
      {
        id: person.id,
        name: person.data.concepts[0].name,
        prediction: person.data.concepts[0].value,
        value: person.data.concepts[0].value,
        boundingBox: {
          leftCol: person.region_info.bounding_box.left_col * width,
          topRow: person.region_info.bounding_box.top_row * height,
          rightCol: width - (person.region_info.bounding_box.right_col * width),
          bottomRow: height - (person.region_info.bounding_box.bottom_row * height),
        }
      }
      )
  })
    return {
      faceRecognized: arrayOfPeople
    };
  }

  displayFaceBox = (data) => {
    this.setState({box: data});
  }

  onClearButtonSubmit = () => {
    fetch('https://frozen-eyrie-32291.herokuapp.com/clear', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
      })
    })
      .then(res => res.json())
      .then(newEntry => {
        this.setState(Object.assign(this.state.user, { entries: newEntry}))
      })
  }

  countFace = (data) => {
    this.setState(Object.assign(this.state.user, {faceCount: data.length}))
  }

  resetCelebrityFaceCounter = () => {
    this.setState(Object.assign(this.state.user, {celebrityCount: 0}))
  }

  countCelebrityFace = (data) => {
    data.forEach(person => {
      let celebrityPossibility = person.data.concepts[0].value
      if (celebrityPossibility > 0.07) {
        this.setState(Object.assign(this.state.user, {celebrityCount: (this.state.user.celebrityCount + 1)}))
      }
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    if (this.state.input !== this.state.imageUrl && this.state.input.length > 1) {
      this.setState({imageUrl: this.state.input});
      fetch("https://frozen-eyrie-32291.herokuapp.com/imageurl", {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input,
          })
        }).then(res => res.json()).then(res => {
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
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
          }
          this.displayFaceBox(this.calculateFaceLocation(res));
          this.countFace(res.outputs[0].data.regions);
          this.resetCelebrityFaceCounter();
          this.countCelebrityFace(res.outputs[0].data.regions);
          //create function that counts number of faces and number of celebrity faces
      }).catch(error => console.log('error', error));
        //END OF CLARIFAI REST API
    }
   
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
    //after state is set, properties are updated to reflect change
  return (
    <div className="App">
        <ParticlesBg className="particles" color="#FFF6C4" config={config} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div> 
              <Entry 
                clear={this.onClearButtonSubmit}
                name={this.state.user.name} 
                entries={this.state.user.entries}
                faceCount={this.state.user.faceCount}
                celebrityFaceCount={this.state.user.celebrityCount}
                />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={box}
                imageUrl={imageUrl}
                />
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
        <Footer />
    </div>
    );
  }
}

export default App;
