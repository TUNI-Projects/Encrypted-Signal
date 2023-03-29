import './css/App.css';
import React from 'react';
import Login from './component/login';
import Register from './component/register';

class App  extends React.Component{


  render() {
    return (
      <div className="App">
        
        <br></br>
        <br></br>
        <br></br>
  
        <div className='row'>
        <div className='col-md-4'></div>
        
        <div className='col-md-4'>
            <div className='row auth' align="center">
              <div className='col-md-6'>
                  <p>Login</p>
                  <hr></hr>
              </div>
  
              <div className='col-md-6'>
                <p>Sign up</p>
                <hr></hr>
              </div>
  
              <Login/>
              <Register />
              
            </div>
        </div>
        <div className='col-md-4'></div>
        </div>
      </div>
    );
  }
}

export default App;
