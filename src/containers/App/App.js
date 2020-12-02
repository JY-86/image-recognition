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

const particleParams = {
  particles: {
    number: {
      value: 150
    }
  }
}

const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY'
});

// app.models.predict(Clarifai., "https://samples.clarifai.com/metro-north.jpg", {language: 'zh'}).then(
//   function(response) {
//     // do something with response
//   },
//   function(err) {
//     // there was an error
//   }
// );

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',

    };
  }

  onInputChange = (e) => {
    
  }

  onSubmit = (e) => {
    this.setState(url, e.target.value);
  }

  render () {
    return (
      <div style={{width:"100%", height:"100%"}}>
        <Particles params={particleParams} className="particles"/>
        <div style={{height:'100%'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} className='pl4 pr4 pt3'>
            <Logo/>
            <Navigation/>
          </div>
          
          <div style={{display:'flex', alignItems:'center', marginTop:'15vh', flexDirection: 'column'}}>
            <Rank/>
            <div style={{height:'50px'}}></div>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          </div>
        <FaceRecognition/>
        </div>
      </div>
    );
  }
}

export default App;
