import React from "react";
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";
import SearchBar from "../components/SearchBar";
import {
  Button,
  Container,
  Typography,
  Grid,
  CssBaseline,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import WelcomeSnackbar from "../components/WelcomeSnackbar";
import { updateQuery } from "../actions/professionals";

class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.checkForToken();
    }
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

  handleClick = (event) => {
    this.props.updateQuery(event.target.innerText.toLowerCase());
    this.props.history.push("/results");
  };

  render() {
    const textStyle = {
      borderBottom: "2px solid #4CAF50",
      width: 80,
      fontSize: "15px",
      marginBottom: 10,
    };

    const buttonStyle = {
      backgroundColor: "#4CAF50",
      color: "white",
      margin: 20,
      padding: 10,
    };
    return (
      <Container maxWidth="lg" style={{ marginTop: 150 }}>
        <WelcomeSnackbar />
        <CssBaseline />
        <Typography variant="h6" style={textStyle}>
          Hire a pro
        </Typography>

        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h3">Find local professionals for</Typography>
            <Typography variant="h3" style={{ marginBottom: 30 }}>
              pretty much everything.
            </Typography>
            <SearchBar />

            <Button onClick={this.handleClick} style={buttonStyle}>
              Personal Trainer
            </Button>

            <Button onClick={this.handleClick} style={buttonStyle}>
              Electricians
            </Button>

            <Button onClick={this.handleClick} style={buttonStyle}>
              App Developers
            </Button>

            <Button onClick={this.handleClick} style={buttonStyle}>
              House Cleaners
            </Button>
          </Grid>

          <Grid item>
            <Button
              size="large"
              variant="contained"
              onClick={() => this.props.history.push("/results")}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                marginTop: 142,
                height: 55,
                marginLeft: 10,
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { currentUser, updateQuery })(
  Dashboard
);
