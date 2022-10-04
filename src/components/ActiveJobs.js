//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
//    Store Actions
//----------x----------x---------
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";
//    UI Components
//----------x----------x---------
import {
  Typography,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
} from "@material-ui/core";
//    Custom Components
//----------x----------x---------
import ActiveJobCard from "../components/ActiveJobCard";
import RadioFiltersJobs from "../components/RadioFiltersJobs";
//    Under Construction: Users will be able
//    to mark jobs as done, leave a review and
//    pay the pro.
//----------x----------x---------
class ActiveJobs extends Component {
  constructor() {
    super();

    this.state = {
      activeJobs: [],
    };
  }
  componentDidMount() {
    this.checkForToken();
    this.fetchJobsData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth) {
      this.fetchJobsData();
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
        .then((user) => {
          if (user.error) {
            this.props.history.push("/login");
          } else {
            this.props.currentUser(user);
          }
        });
    }
  };

  fetchJobsData = () => {
    if (this.props.auth) {
      const userId = this.props.auth.id;

      fetch(`https://shrouded-retreat-77877.herokuapp.com/users/${userId}/jobs`)
        .then((response) => response.json())
        .then((response) => this.setState({ activeJobs: response }));
    }
  };

  renderActiveJobs = () => {
    let filteredJobs = [];
    if (this.props.filter === "completed") {
      filteredJobs = this.state.activeJobs.filter(
        (job, idx) => job.status === "Complete"
      );
    } else if (this.props.filter === "pending") {
      filteredJobs = this.state.activeJobs.filter(
        (job, idx) => job.status === "Pending"
      );
    } else {
      filteredJobs = this.state.activeJobs;
    }

    return filteredJobs.map((job, idx) => {
      console.log("Job", job);
      return (
        <ActiveJobCard job={job} key={idx} setAsComplete={this.setAsComplete} />
      );
    });
  };

  setAsComplete = (jobObj) => {
    const updatedActiveJobs = this.state.activeJobs.map((job) => {
      if (job.id === jobObj.id) {
        return jobObj;
      } else {
        return job;
      }
    });

    this.setState({
      activeJobs: updatedActiveJobs,
    });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Active Jobs
        </Typography>
        <Grid container style={{ padding: "1.5%" }} spacing={2}>
          <Grid item xs={2}>
            <Paper style={{ padding: 20 }}>
              <Typography>Show:</Typography>
              <RadioFiltersJobs />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            {this.props.auth ? this.renderActiveJobs() : <CircularProgress />}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { currentUser })(ActiveJobs);
