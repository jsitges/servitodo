import React, { Component } from "react";
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";
import { fetchSuccess } from "../actions/professionals";
import ResultsGrid from "./ResultsGrid";
import RadioFilters from "./RadioFilters";
import SearchBar from "./SearchBar";
import ZipCodeSnackbar from "./ZipCodeSnackbar";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  CssBaseline,
} from "@material-ui/core";

class Results extends Component {
  componentDidMount() {
    this.checkForToken();
    this.fetchProData();
  }

  fetchProData = () => {
    fetch("https://shrouded-retreat-77877.herokuapp.com/professionals")
      .then((response) => response.json())
      .then((response) => this.props.fetchSuccess(response.professionals));
  };

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
        .then((user) => {
          if (user.error) {
            this.props.history.push("/login");
          } else {
            this.props.currentUser(user);
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.props.auth ? (
          <ZipCodeSnackbar zipCode={this.props.auth.zip_code} />
        ) : null}

        <Grid container spacing={2} style={{ padding: "1.5%" }}>
          <Grid item xs={2}>
            <div style={{ marginBottom: 20 }}>
              <SearchBar />
            </div>

            <Paper style={{ padding: 20 }}>
              <Typography>Sort by:</Typography>
              <RadioFilters />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            {this.props.auth ? (
              <ResultsGrid history={this.props.history} />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    professionals: state.professionals,
  };
};

export default connect(mapStateToProps, { currentUser, fetchSuccess })(Results);
