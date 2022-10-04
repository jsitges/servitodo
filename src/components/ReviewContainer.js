//    Necessary Imports
//----------x----------x---------
import React from "react";
//    UI Components
//----------x----------x---------
import { CssBaseline, Typography, Container } from "@material-ui/core";
//    Custom Components
//----------x----------x---------
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";
//    *** Need to change to functional component
//----------x----------x---------
import ReviewCard from "./ReviewCard";

class ReviewContainer extends React.Component {
  componentDidMount() {
    this.checkForToken();
  }

  checkForToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      this.props.history.push("/login");
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch("https://shrouded-retreat-77877.herokuapp.com/current_user", reqObj)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            this.props.history.push("/login");
          } else {
            this.props.currentUser(response);
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{ marginBottom: 50 }}>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Submit Review
          </Typography>
          <ReviewCard match={this.props.match} history={this.props.history} />
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(null, { currentUser })(ReviewContainer);
