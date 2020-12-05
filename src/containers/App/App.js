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
      box: {},
      route: 'signin',
      signedIn: false
    };
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onSubmit = (e) => {
    this.setState({url: this.state.input}, () => {
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.url)
      .then(response => this.setBoundingBox(response))
      .catch(err => console.log(err));
    });
  }

  setBoundingBox = (data) => {
    let boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;

    let img = document.querySelector("#face-image");
    let width = Number(img.width);
    let height = Number(img.height);
    let pixelBox = {
      left: boundingBox.left_col * width,
      right: (1-boundingBox.right_col) * width,
      top: boundingBox.top_row * height,
      bottom: (1-boundingBox.bottom_row) * height
    };

    this.setState({box: pixelBox});
  }

  getRouteJSX() {
    const { route } = this.state;
    switch (route) {
      case 'signin':
        return (
          <Signin></Signin>
        );
      
      case 'register':
        return (
          <Register></Register>
        );

      case 'home': // home
        return (
        <div>
          <div style={{display:'flex', alignItems:'center', marginTop:'15vh', flexDirection: 'column'}}>
            <Rank/>
            <div style={{height:'50px'}}></div>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          </div>
          <FaceRecognition imgUrl={this.state.url} boundingBox={this.state.box}/>
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
            <Navigation signedIn={this.state.signedIn}/>
          </div>
          {this.getRouteJSX()}
        </div>
      </div>
    );
  }
}

export default App;
