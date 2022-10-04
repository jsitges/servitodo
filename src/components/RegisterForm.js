//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
//    UI Components
//----------x----------x---------
import { FormGroup, TextField, Button } from "@material-ui/core";
//    Store Actions
//----------x----------x---------
import { loginSuccess } from "../actions/auth";
import { connect } from "react-redux";

class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      zip_code: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        zip_code: this.state.zip_code,
      }),
    };

    fetch("https://shrouded-retreat-77877.herokuapp.com/register", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            zip_code: "",
            error: "Input error, please check your data.",
          });
        } else {
          localStorage.setItem("token", data.token);
          this.props.loginSuccess(data);
          this.props.history.push("/");
        }
      });
  };
  render() {
    const textfieldStyle = {
      paddingBottom: 20,
    };
    return (
      <FormGroup>
        <TextField
          autoFocus
          error={this.state.error === "Input error, please check your data."}
          label="Name"
          variant="outlined"
          name="name"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          label="Last Name"
          error={this.state.error === "Input error, please check your data."}
          variant="outlined"
          name="last_name"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          label="Email"
          error={this.state.error === "Input error, please check your data."}
          variant="outlined"
          name="email"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          type="password"
          error={this.state.error === "Input error, please check your data."}
          label="Password"
          variant="outlined"
          name="password"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          type="password"
          error={this.state.error === "Input error, please check your data."}
          label="Password Confirmation"
          variant="outlined"
          name="password_confirmation"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          type="number"
          error={this.state.error === "Input error, please check your data."}
          label="Zip Code"
          variant="outlined"
          name="zip_code"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          style={{ backgroundColor: "#4CAF50" }}
        >
          Create Account
        </Button>
      </FormGroup>
    );
  }
}

export default connect(null, { loginSuccess })(RegisterForm);
