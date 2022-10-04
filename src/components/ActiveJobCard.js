import React, { Component } from "react";
import {
  Typography,
  Button,
  Grid,
  CssBaseline,
  Paper,
  ButtonBase,
} from "@material-ui/core";

class ActiveJobCard extends Component {
  constructor() {
    super();
  }

  renderStars = (averageReviews) => {
    switch (averageReviews) {
      case 0:
        return <Typography>New to Servitodo</Typography>;
      case 1:
        return (
          <Typography>
            <span role="img">⭐</span> Getting Started
          </Typography>
        );

      case 2:
        return (
          <Typography>
            <span role="img">⭐⭐</span>Good
          </Typography>
        );

      case 3:
        return (
          <Typography>
            <span role="img">⭐⭐⭐</span> Very Good
          </Typography>
        );

      case 4:
        return (
          <Typography>
            <span role="img">⭐⭐⭐⭐</span> Excellent
          </Typography>
        );

      case 5:
        return (
          <Typography>
            <span role="img">⭐⭐⭐⭐⭐</span> Exceptional
          </Typography>
        );

      default:
        return <Typography>No reviews yet.</Typography>;
    }
  };

  handleComplete = () => {
    const jobId = this.props.job.id;

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: jobId }),
    };

    fetch(
      `https://shrouded-retreat-77877.herokuapp.com/jobs/${jobId}`,
      configObj
    )
      .then((response) => response.json())
      .then((response) => {
        this.props.setAsComplete(response);
      })
      .catch((error) => console.log(error.message));
  };

  handleDelete = () => {
    const jobId = this.props.job.id;

    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: jobId }),
    };

    fetch(
      `https://shrouded-retreat-77877.herokuapp.com/jobs/${jobId}`,
      configObj
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const {
      id,
      title,
      status,
      estimated_cost,
      professional_id,
      professional_img,
      professional_name,
      professional_average_rating,
    } = this.props.job;

    const paper = { padding: "2%", marginBottom: 20 };
    const image = { width: 168, height: 168 };
    const img = {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "20%",
    };
    const doneButton = {
      color: "white",
      backgroundColor: "#4CAF50",
      marginTop: 10,
      marginRight: 10,
    };
    const cancelButton = {
      color: "white",
      backgroundColor: "red",
      marginTop: 10,
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper style={paper} elevation={1}>
          <Grid container spacing={4}>
            <Grid item>
              <ButtonBase style={image} href={`/results/${professional_id}`}>
                <img style={img} alt="complex" src={professional_img} />
              </ButtonBase>
            </Grid>

            <Grid item sm container>
              <Grid item xs={10} container direction="column">
                <Grid item>
                  <Typography gutterBottom variant="h5">
                    {professional_name}
                  </Typography>
                </Grid>

                <Grid item>
                  {this.renderStars(professional_average_rating)}
                </Grid>

                <Grid item>
                  <Typography>Description: {title}</Typography>
                </Grid>

                <Grid item>
                  <Typography>Status: {status}</Typography>
                </Grid>
              </Grid>

              {status === "Pending" ? (
                <Grid item>
                  <Button
                    onClick={this.handleComplete}
                    style={doneButton}
                    variant="contained"
                  >
                    Done
                  </Button>

                  <Button
                    onClick={this.handleDelete}
                    style={cancelButton}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    href={`/jobs/${id}/review/${professional_id}`}
                    style={doneButton}
                    variant="contained"
                    color="primary"
                  >
                    Leave Review
                  </Button>
                  <Button
                    href={`/results/${professional_id}/pay/${estimated_cost}`}
                    style={doneButton}
                    variant="contained"
                    color="primary"
                  >
                    Pay
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

export default ActiveJobCard;
