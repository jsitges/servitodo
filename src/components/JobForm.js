import React, { Component } from "react";
import { FormGroup, TextField, Button } from "@material-ui/core";

class JobForm extends Component {
  state = {
    title: "",
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const job = {
      title: this.state.title,
      user_id: this.props.userId,
      professional_id: this.props.proId,
    };

    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    };

    fetch("https://shrouded-retreat-77877.herokuapp.com/jobs", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log("Job created");
          this.props.history.push("/jobs");
        }
      });
  };

  render() {
    return (
      <FormGroup>
        <TextField
          autoFocus
          id="outlined-basic"
          label="Job Description"
          variant="outlined"
          name="title"
          onChange={this.handleInputChange}
          value={this.state.title}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={this.handleSubmit}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            marginBottom: 20,
          }}
        >
          Submit
        </Button>
      </FormGroup>
    );
  }
}

export default JobForm;
