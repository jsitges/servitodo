//    Necessary Imports
//----------x----------x---------
import React from "react";
//    UI Components
//----------x----------x---------
import { CssBaseline, Typography, Container } from "@material-ui/core";
//    Custom Components
//----------x----------x---------

//    *** Need to change to functional component
//----------x----------x---------
import LoginCard from "../components/LoginCard";

export default function Login() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Welcome Back
        </Typography>
        <LoginCard />
      </Container>
    </React.Fragment>
  );
}
