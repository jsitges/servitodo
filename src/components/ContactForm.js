import React, { Component } from "react";
import { FormGroup, TextField } from "@material-ui/core";
import EmailPro from "../components/EmailPro";

class ContactForm extends Component {
  state = {
    message: "",
    showSnackbar: false,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  emailSent = () => {
    this.setState({
      showSnackbar: true,
    });
  };

  render() {
    return (
      <div>
        <FormGroup>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Message"
            variant="outlined"
            name="message"
            onChange={this.handleInputChange}
            value={this.state.message}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <EmailPro
            email={this.props.email}
            message={this.state.message}
            toggleContactForm={this.props.toggleContactForm}
            emailSent={this.props.emailSent}
          />
        </FormGroup>
      </div>
    );
  }
}

export default ContactForm;
