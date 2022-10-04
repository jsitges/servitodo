import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Button } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    marginBottom: 20,
  },
  image: {
    width: 168,
    height: 168,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%",
  },
  button: {
    marginTop: "75%",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  star: {
    color: "#009fd9",
  },
}));

const renderStars = (averageReviews) => {
  switch (averageReviews) {
    case 0:
      return <Typography>New to Servitodo</Typography>;
    case 1:
      return (
        <Typography>
          <span>⭐</span> Getting Started
        </Typography>
      );

    case 2:
      return (
        <Typography>
          <span>⭐⭐</span>Good
        </Typography>
      );

    case 3:
      return (
        <Typography>
          <span>⭐⭐⭐</span> Very Good
        </Typography>
      );

    case 4:
      return (
        <Typography>
          <span>⭐⭐⭐⭐</span> Excellent
        </Typography>
      );

    case 5:
      return (
        <Typography>
          <span>⭐⭐⭐⭐⭐</span> Exceptional
        </Typography>
      );

    default:
      return <Typography>No reviews yet.</Typography>;
  }
};

export default function ProCard(props) {
  const classes = useStyles();
  const {
    id,
    name,
    times_hired,
    time_in_bussiness,
    zip_code,
    average_reviews,
    estimated_cost,
    img_url,
  } = props.professional;

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper className={classes.paper} elevation={1}>
        <Grid container spacing={4}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={img_url} />
            </ButtonBase>
          </Grid>

          <Grid item sm container>
            <Grid item xs={10} container direction="column">
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  {" "}
                  {name}
                </Typography>
              </Grid>

              <Grid item>{renderStars(average_reviews)}</Grid>

              <Grid item>
                <Typography>🏆 {times_hired} hires on Servitodo</Typography>
              </Grid>

              <Grid item>
                <Typography>
                  💼 {time_in_bussiness} years in business
                </Typography>
              </Grid>

              <Grid item>
                <Typography>📍 Serves in {zip_code}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                ${estimated_cost}/hour
              </Typography>
              <Typography variant="body2" color="textSecondary">
                estimated cost
              </Typography>
              <Button
                onClick={() => props.history.push(`/results/${id}`)}
                className={classes.button}
                variant="contained"
              >
                View Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
