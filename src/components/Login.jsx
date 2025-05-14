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
    this.state.isPending = true;

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
          var dto = this.state;
          dto.isPending = false;
          dto.loginSuccessful = respJson.data.success;
          dto.loginMessage = respJson.message;

          if (respJson.data.success) {
            dto.loginSuccessful = true;
          }

          this.setState({ dto });
        });
    } catch (error) {
      console.error(error.message);
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

        {/* <p>{this.state.loginSuccessful.valueOf}</p> */}

        {this.state.loginMessage && <p>{this.state.loginMessage}</p>}
      </div>
    );
  }
}

export default Login;
