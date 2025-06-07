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
    };
  }

  syncInputChanges = (property, value) => {
    let state = {};
    state[property] = value;
    this.setState(state);
  };

  submitForm = async (e) => {
    e.preventDefault();
    
    console.log("is pending");
    console.log(this.state.isPending);

    var dto = this.state;
    console.log("dto");
    console.log(dto);
    dto.isPending = true;
    this.setState(dto);
    console.log("new state");
    console.log(this.state);

    try {
      console.log("entered try");

      var resp = await fetch(companyData.login_URL, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });
      // console.log("resp");
      // console.log(resp);

      var respJson = await resp.json();
      console.log("respJson");
      console.log(respJson);

      var dtoTry = this.state;
      dtoTry.isPending = false;
      dtoTry.loginSuccessful = respJson.data.success;
      dtoTry.loginMessage = respJson.message;
      this.setState({dtoTry});

    }
    catch (error) {
      var catchErrorMessage = "An error ocurred while trying to login. " + error.message;
      var dtoCatch = this.state;
      console.log("dto entering catch");
      console.log(dto);
      dtoCatch.isPending = false;
      dtoCatch.loginSuccessful = false;
      dtoCatch.loginMessage = catchErrorMessage;
      this.setState({dtoCatch});
      console.log("state in catch");
      console.log(this.state);
      console.error(catchErrorMessage);
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
