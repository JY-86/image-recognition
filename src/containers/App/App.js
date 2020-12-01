import React from 'react';
import './App.css';
import 'tachyons';

import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div style={{height:'100%'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} className='pl4 pr4 pt3'>
          <Logo/>
          <Navigation/>
        </div>
      
      	<div style={{height:'100%', display:'flex', justifyContent:'center', marginTop:'100px'}}>
		  <ImageLinkForm/>
		</div>
      {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
