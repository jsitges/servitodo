import React, { Component } from "react";
import { FormGroup, TextField, Button, MenuItem } from "@material-ui/core";

class JoinForm extends Component {
  constructor() {
    super();

    this.categories = [
      { value: "Personal Trainers", label: "Personal Trainers" },
      { value: "Electricians", label: "Electricians" },
      { value: "App Developers", label: "App Developers" },
      { value: "House Cleaners", label: "House Cleaners" },
    ];

    this.state = {
      name: "",
      email: "",
      introduction: "",
      zip_code: "",
      estimated_cost: "",
      category: this.categories[0].value,
      time_in_bussiness: "",
      img_url: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    fetch("https://shrouded-retreat-77877.herokuapp.com/professionals", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
        }
      });
  };

  render() {
    const textfieldStyle = { paddingBottom: 20 };

    return (
      <FormGroup>
        <TextField
          autoFocus
          label="Name"
          variant="outlined"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          style={textfieldStyle}
        />
        <TextField
          label="Profile Picture URL"
          variant="outlined"
          name="img_url"
          onChange={this.handleChange}
          value={this.state.img_url}
          style={textfieldStyle}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
          style={textfieldStyle}
        />
        <TextField
          multiline
          helperText="Please include your work profession in here."
          placeholder="Developer, electrician, lawyer"
          rows={4}
          defaultValue="Default Value"
          label="Introduction"
          variant="outlined"
          name="introduction"
          onChange={this.handleChange}
          value={this.state.introduction}
          style={textfieldStyle}
        />
        <TextField
          type="number"
          label="Zip Code"
          variant="outlined"
          name="zip_code"
          onChange={this.handleChange}
          value={this.state.zip_code}
          style={textfieldStyle}
        />
        <TextField
          type="number"
          label="Time in Business"
          variant="outlined"
          name="time_in_bussiness"
          onChange={this.handleChange}
          value={this.state.time_in_bussiness}
          style={textfieldStyle}
        />
        <TextField
          type="number"
          label="Estimated Cost"
          variant="outlined"
          name="estimated_cost"
          onChange={this.handleChange}
          value={this.state.estimated_cost}
          style={textfieldStyle}
        />
        <TextField
          select
          helperText="Please select a category"
          variant="outlined"
          label="Select"
          value={this.state.category}
          onChange={this.handleSelectChange}
        >
          {this.categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          size="large"
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
          value="login"
          style={{ marginTop: 30, backgroundColor: "#4CAF50" }}
        >
          Submit Application
        </Button>
      </FormGroup>
    );
  }
}

export default JoinForm;
