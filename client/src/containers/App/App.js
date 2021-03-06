import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Signin from '../../components/Signin/Signin';
import Register from '../../components/Register/Register';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import url from '../../utils/backend-url-resolver';

const particleParams = {
  particles: {
    number: {
      value: 150
    }
  }
}

const app = new Clarifai.App({
 apiKey: 'ffdc16c171ed4d729d15045baf9c6f81'
});

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',
      input: '',
      boxes: [],
      route: 'signin',
      signedIn: false,
      user: {}
    };
  }

  loadUser = user => {
    console.log(user);
    this.setState({user: user});
    console.log(this.state.user.entries);
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onPictureSubmit = (e) => {
    this.setState({url: this.state.input}, () => {
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.url)
      .then(response => this.setBoundingBoxes(response))
      .then(
        fetch(url + "/image", {
          method: 'PUT',
          headers: {
            "Content-Type": "text/plain"
          },
          body: this.state.user.id.toString()
        })
        .then(res => res.json())
        .then(entries => {
          // update user state to increase entries
          this.setState({user: {
            ...this.state.user,
            entries: entries
          }});
        })
        .catch(err => console.log("A server error occurred: " + err))
      )
      .catch(err => console.log(err));
    });
    //console.log(this.state.toString());
  }

  setBoundingBoxes = (data) => {
    let img = document.querySelector("#face-image");
    let width = Number(img.width);
    let height = Number(img.height);

    let boundingBoxes = data.outputs[0].data.regions.map(i => {
      let box = i.region_info.bounding_box;
      return {
        left: box.left_col * width,
        right: (1-box.right_col) * width,
        top: box.top_row * height,
        bottom: (1-box.bottom_row) * height
      };
    });
    this.setState({boxes: boundingBoxes});
  }

  onRouteChange = (route) => {
    let state = {route: route};
    if (route=== 'signout') {
      state.signedIn = false;
      state.route = 'signin'; // redirect
    }
    else if (route === 'home') {
      state.signedIn = true;
    }
    this.setState(state);
  }

  getRouteJSX() {
    const { route } = this.state;
    switch (route) {
      case 'signin':
        return (
          <ErrorBoundary>
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}></Signin>
          </ErrorBoundary>
        );
      
      case 'register':
        return (
          <ErrorBoundary>
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}></Register>
          </ErrorBoundary>
        );

      case 'home': // home
        return (
        <div>
          <div style={{display:'flex', alignItems:'center', marginTop:'15vh', flexDirection: 'column'}}>
            <Rank name={this.state.user.username} rank={this.state.user.entries}/>
            <div style={{height:'50px'}}></div>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onPictureSubmit}/>
          </div>
          <FaceRecognition imgUrl={this.state.url} boundingBoxes={this.state.boxes}/>
        </div>
        );

      default:
        throw Error('Unrecognised route');
    }
  }
  render () {
    return (
      <div style={{width:"100%", height:"100%"}}>
        <Particles params={particleParams} className="particles"/>
        <div style={{height:'100%'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} className='pl4 pr4 pt3'>
            {this.state.route === 'home' ? <Logo/> : <div/>}
            <Navigation signedIn={this.state.signedIn} onRouteChange={this.onRouteChange}/>
          </div>
          {this.getRouteJSX()}
        </div>
      </div>
    );
  }
}

export default App;
