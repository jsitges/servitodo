//    Necessary Imports
//----------x----------x---------
import React from "react";
//    UI Components
//----------x----------x---------
import { CssBaseline, Typography, Container } from "@material-ui/core";
//    Custom Components
//----------x----------x---------
import RegisterCard from "../components/RegisterCard";

class Register extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Create your account
          </Typography>
          <RegisterCard history={this.props.history} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Register;
