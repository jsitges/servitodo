import React from "react";
import { Container, makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <Container maxWidth="large">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <Typography variant="h3">Under Construction!</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
