//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
//    Store Actions
//----------x----------x---------
// import { loginSuccess } from "../actions/auth";
// import { connect } from "react-redux";
//    UI Components
//----------x----------x---------
import { FormGroup, TextField, Button } from "@material-ui/core";

import { connect } from "react-redux";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      rating: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const jobId = this.props.match.params.jobId;

    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: jobId,
        content: this.state.content,
        rating: this.state.rating,
      }),
    };

    fetch("https://shrouded-retreat-77877.herokuapp.com/reviews", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          this.props.history.push("/jobs");
        }
      });
  };

  render() {
    const textfieldStyle = { paddingBottom: 20 };
    return (
      <FormGroup style={{ textAlign: "center" }}>
        <TextField
          autoFocus
          type="text"
          name="content"
          label="Content"
          variant="outlined"
          placeholder="Write your honest comments here"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          helperText="Rating must be a number between 1 and 5"
          type="number"
          name="rating"
          label="Rating"
          variant="outlined"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          style={{ backgroundColor: "#4CAF50" }}
        >
          Submit Review
        </Button>
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(ReviewForm);
