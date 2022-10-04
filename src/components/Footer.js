import React from "react";
import { Grid, Typography, ButtonBase, makeStyles } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 22.5,
  },
  byEmilio: {
    color: "grey",
  },
  grid: {
    flexGrow: 1,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer id="footer">
      <Grid container spacing={2}>
        <Grid item>
          <Typography> &#169; 2020 Servitodo, Inc</Typography>
        </Grid>
        <Grid item>
          <ButtonBase href="https://www.linkedin.com/in/emilio-quintana-dev/">
            <LinkedInIcon className={classes.icon} />
          </ButtonBase>
        </Grid>

        <Grid item className={classes.grid}>
          <ButtonBase href="https://www.instagram.com/equintanalopez/">
            <InstagramIcon className={classes.icon} />
          </ButtonBase>
        </Grid>

        <Grid item>
          <Typography className={classes.byEmilio}>
            developed by Emilio Quintana
          </Typography>
        </Grid>

        <Grid item>
          <ButtonBase href="https://emilio-quintana-dev.github.io/">
            <BlurOnIcon className={classes.icon} />
          </ButtonBase>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
