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

  submitForm = (e) => {
    e.preventDefault();
    console.log("In submit");
    this.state.isPending = true;

    console.log("this.state.email");
    console.log(this.state.email);
    console.log("this.state.password");
    console.log(this.state.password);

    try {
      fetch(companyData.login_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
      .then((resp) => resp.json())
      .then((respJson) => {
        console.log("The response received is:");
        console.log(respJson);

        var dto = this.state;
        dto.isPending = false;
        dto.loginSuccessful = respJson.data.success;
        dto.loginMessage = respJson.message;

        // if (respJson.data.success) {
        //   dto.loginSuccessful = true;
        // }

        this.setState({ dto });
      });
    }
    catch (error) {
      console.error("There was an error while trying to login. " + error.message);
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
