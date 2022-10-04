import React from "react";
import JoinForm from "../components/JoinForm";
import { Card, CardContent } from "@material-ui/core";

const JoinCard = (props) => {
  const cardStyle = { padding: "20px", margin: "20px" };
  return (
    <Card style={cardStyle}>
      <CardContent>
        <JoinForm history={props.history} />
      </CardContent>
    </Card>
  );
};

export default JoinCard;
