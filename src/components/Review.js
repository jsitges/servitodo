import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { Typography } from "@material-ui/core";

const renderStars = (review) => {
  switch (review.rating) {
    case 1:
      return (
        <div>
          <StarIcon style={{ color: "#4CAF50" }} />
          <Typography>{review.content}</Typography>
        </div>
      );

    case 2:
      return (
        <div>
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <Typography>{review.content}</Typography>
        </div>
      );

    case 3:
      return (
        <div>
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <Typography>{review.content}</Typography>
        </div>
      );

    case 4:
      return (
        <div>
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <Typography>{review.content}</Typography>
        </div>
      );

    case 5:
      return (
        <div>
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <StarIcon style={{ color: "#4CAF50" }} />
          <Typography>{review.content}</Typography>
        </div>
      );

    default:
      return null;
  }
};

const Review = (props) => {
  return <div>{renderStars(props.review)}</div>;
};

export default Review;
