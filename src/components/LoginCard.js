//    Necessary Imports
//----------x----------x---------
import React from "react";
//    Custom Components
//----------x----------x---------
import LoginForm from "../components/LoginForm";
//    UI Components
//----------x----------x---------
import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    margin: 20,
  },
}));

export default function LoginCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
