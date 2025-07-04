import { Component } from "react";
import companyData from "../companyData.json";

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isPending: false,
      loginSuccessful: false,
      loginMessage: "",
      token: ""
    };
  }

  componentDidMount()
  {
    const token = localStorage.getItem('token');
    if(token)
    {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if(tokenExpiration && new Date(tokenExpiration) > new Date())
      {
        // console.log("Session is active.");
      }
      else
      {
        // console.log("Session is expired.");
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      }
    }
  }

  componentDidUpdate()
  {
    // console.log("Component has been updated.");
    // console.log("New state token:");
    // console.log(this.state.token);
  }

  syncInputChanges = (property, value) => {
    let state = {};
    state[property] = value;
    this.setState(state);
  };

  submitForm = async (e) => {
    e.preventDefault();

    var dto = this.state;
    dto.isPending = true;
    this.setState(dto);

    try {
      var resp = await fetch(companyData.login_URL, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });

      var respJson = await resp.json();

      localStorage.setItem('token', respJson.data.token);

      var dtoTry = this.state;
      dtoTry.isPending = false;
      dtoTry.loginSuccessful = respJson.data.success;
      dtoTry.loginMessage = respJson.message;
      dtoTry.token = respJson.data.token;
      this.setState({dtoTry});

    }
    catch (error) {
      var catchErrorMessage = "An error ocurred while trying to login. " + error.message;
      var dtoCatch = this.state;
      dtoCatch.isPending = false;
      dtoCatch.loginSuccessful = false;
      dtoCatch.loginMessage = catchErrorMessage;
      this.setState({dtoCatch});
    }
    finally{
      //
    }
  };

  render() {
    return (
      <div>
        
        {!this.state.loginSuccessful && (
          <div>
            <p>Sign in</p>
            <form onSubmit={this.submitForm}>
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => {
                  this.syncInputChanges("email", event.target.value);
                }}
              ></input>
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(event) => {
                  this.syncInputChanges("password", event.target.value);
                }}
              ></input>
              {!this.state.isPending && <button>Login</button>}
              {this.state.isPending && <button disabled>Loading...</button>}
            </form>
          </div>
        )}

        {this.state.loginMessage && (
          <div>
            <p>{this.state.loginMessage}</p>
          </div>
        )}

        {this.state.loginSuccessful && (
          <div>
            <button type="button">Logout</button>
          </div>
        )}

        
      </div>
    );
  }
}

export default Login;
