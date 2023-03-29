import './css/App.css';

function App() {
  return (
    <div className="App">
      
      <br></br>
      <br></br>
      <br></br>

      <div className='row'>
      <div className='col-md-3'></div>
      
      <div className='col-md-6'>
          <div className='row auth' align="center">
            <div className='col-md-6'>
                <p>Login</p>
                <hr></hr>
            </div>

            <div className='col-md-6'>
              <p>Sign up</p>
              <hr></hr>
            </div>

            <form align="left">
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <br></br>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
            
          </div>
      </div>
      <div className='col-md-3'></div>
      </div>
    </div>
  );
}

export default App;
