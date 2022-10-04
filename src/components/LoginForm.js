//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
//    Store Actions
//----------x----------x---------
import { loginSuccess } from "../actions/auth";
import { connect } from "react-redux";
//    UI Components
//----------x----------x---------
import {
  FormGroup,
  TextField,
  Button,
  makesStyles,
  Checkbox,
} from "@material-ui/core";

const api = "https://shrouded-retreat-77877.herokuapp.com/";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "No errors yet:D",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { loginSuccess, history } = this.props;
    const self = this;
    axios
      .post(api + "auth", {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error);
          self.setState({
            email: "",
            password: "",
            error: response.data.error,
          });
        } else {
          localStorage.setItem("token", response.data.token);
          loginSuccess(response.data);
          history.push("/search");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const textfieldStyle = { paddingBottom: 20 };

    return (
      <FormGroup style={{ textAlign: "center" }}>
        <TextField
          autoFocus
          value={this.state.email}
          error={this.state.error === "Invalid Username or password"}
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          error={this.state.error === "Invalid Username or password"}
          helperText={
            this.state.error === "Invalid Username or password"
              ? "Invalid Username or Password"
              : null
          }
          value={this.state.password}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        {/* <Checkbox
          defaultChecked
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        /> */}

        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          style={{ backgroundColor: "#4CAF50" }}
        >
          Log in
        </Button>
      </FormGroup>
    );
  }
}

export default withRouter(connect(null, { loginSuccess })(LoginForm));
