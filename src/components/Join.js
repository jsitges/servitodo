import React, { Component } from "react";
import { CssBaseline, Typography, Container } from "@material-ui/core";
import JoinCard from "../components/JoinCard";

class Join extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Apply and get leads
          </Typography>
          <JoinCard history={this.props.history} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Join;
