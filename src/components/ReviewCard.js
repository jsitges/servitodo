//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
//    Custom Components
//----------x----------x---------
import ReviewForm from "../components/ReviewForm";
//    UI Components
//----------x----------x---------
import { Card, CardContent, ButtonBase } from "@material-ui/core";

//    ***Need to import makeStyles
//----------x----------x---------
class ReviewCard extends Component {
  constructor() {
    super();

    this.state = {
      img_url: "",
    };
  }

  componentDidMount() {
    const proId = this.props.match.params.professionalId;
    fetch(`https://shrouded-retreat-77877.herokuapp.com/professionals/${proId}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          img_url: response.professional.img_url,
        });
      });
  }

  render() {
    const cardStyle = { padding: 10, margin: 20, textAlign: "center" };
    const image = { width: 168, height: 168, margin: 10 };
    const img = {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "50%",
    };
    return (
      <Card style={cardStyle}>
        <CardContent>
          <ButtonBase style={image}>
            {this.state.img_url ? (
              <img style={img} alt="complex" src={this.state.img_url} />
            ) : null}
          </ButtonBase>
          <ReviewForm match={this.props.match} history={this.props.history} />
        </CardContent>
      </Card>
    );
  }
}

export default ReviewCard;
