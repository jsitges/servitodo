//    Necessary Imports
//----------x----------x---------
import React from "react";
//    Custom Components
//----------x----------x---------
import RegisterForm from "../components/RegisterForm";
//    UI Components
//----------x----------x---------
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    margin: 20,
  },
  terms: {
    color: "grey",
    textAlign: "center",
    fontSize: 12,
  },
}));
function RegisterCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <RegisterForm history={props.history} />
      </CardContent>
      <Typography className={classes.terms}>
        By clicking 'register' you accept our terms and conditions.
      </Typography>
    </Card>
  );
}

export default RegisterCard;
