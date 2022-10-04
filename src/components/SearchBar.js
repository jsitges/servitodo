//                   Necesary Imports
// ---------------x--------------------x---------------
import React, { Component } from "react";
import { connect } from "react-redux";
//                     UI Components
// ---------------x--------------------x---------------
import { TextField } from "@material-ui/core";
//                        Actions
// ---------------x--------------------x---------------
import { updateQuery } from "../actions/professionals";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      query: "",
    };
  }

  //                     Controlled Input
  // ---------------x--------------------x---------------
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    this.props.updateQuery(event.target.value);
  };

  render() {
    return (
      <TextField
        variant="outlined"
        name="query"
        placeholder={this.props.query == "" ? "Search" : this.props.query}
        value={this.state.query}
        inputProps={{ "aria-label": "search" }}
        onChange={this.handleChange}
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.query,
  };
};

export default connect(mapStateToProps, { updateQuery })(SearchBar);
