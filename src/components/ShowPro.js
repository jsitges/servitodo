import React, { Component } from "react";
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Review from "../components/Review";
import JobForm from "../components/JobForm.js";
import ContactForm from "../components/ContactForm.js";
import EmailSuccessSnackbar from "./EmailSuccessSnackbar";
class ShowPro extends Component {
  constructor() {
    super();

    this.state = {
      professional: {},
      reviews: [],
      showJobForm: false,
      showContactForm: false,
      showSnackbar: false,
    };
  }
  componentDidMount() {
    this.checkForToken();
    this.fetchProData();
  }

  fetchProData = () => {
    const id = parseInt(this.props.match.params.professionalId);
    fetch(`https://shrouded-retreat-77877.herokuapp.com/professionals/${id}`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          reviews: response.reviews,
          professional: response.professional,
        })
      );
  };

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

  renderReviews = () => {
    return this.state.reviews.map((review, idx) => {
      return <Review review={review} key={idx} />;
    });
  };

  renderStars = (rating, totalReviews) => {
    switch (rating) {
      case 0:
        return <Typography>New to Servitodo</Typography>;
      case 1:
        return (
          <Typography>
            <span>⭐</span> Getting Started ({totalReviews})
          </Typography>
        );

      case 2:
        return (
          <Typography>
            <span>⭐⭐</span>Good ({totalReviews})
          </Typography>
        );

      case 3:
        return (
          <Typography>
            <span>⭐⭐⭐</span> Very Good ({totalReviews})
          </Typography>
        );

      case 4:
        return (
          <Typography>
            <span>⭐⭐⭐⭐</span> Excellent ({totalReviews})
          </Typography>
        );

      case 5:
        return (
          <Typography>
            <span>⭐⭐⭐⭐⭐</span> Exceptional ({totalReviews})
          </Typography>
        );

      default:
        return <Typography>No reviews yet.</Typography>;
    }
  };

  toggleJobForm = () => {
    const newState = !this.state.showJobForm;
    this.setState({
      showJobForm: newState,
    });
  };

  toggleContactForm = () => {
    const newState = !this.state.showContactForm;
    this.setState({
      showContactForm: newState,
    });
  };

  emailSent = () => {
    this.setState({
      showSnackbar: true,
    });
  };

  render() {
    const {
      name,
      introduction,
      time_in_bussiness,
      times_hired,
      zip_code,
      average_reviews,
      estimated_cost,
      img_url,
    } = this.state.professional;

    return (
      <React.Fragment>
        {this.state.showSnackbar ? <EmailSuccessSnackbar /> : null}
        <Container>
          <Grid container>
            <Grid item>
              <img
                width="256"
                height="256"
                alt="complex"
                style={{ borderRadius: "50%", marginRight: 20 }}
                src={img_url}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={8} container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    {" "}
                    {name}
                  </Typography>
                </Grid>

                <Grid item>
                  {this.renderStars(average_reviews, this.state.reviews.length)}
                </Grid>

                <Grid item>
                  <Typography>
                    💼 {time_in_bussiness} years in business
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography>📍 Serves in {zip_code}</Typography>
                </Grid>

                <Grid item>
                  <Typography>🏆 {times_hired} hires on Servitodo</Typography>
                </Grid>

                <Grid item style={{ marginTop: 10 }}>
                  <Button
                    onClick={this.toggleJobForm}
                    variant="contained"
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      marginRight: 15,
                    }}
                    size="large"
                  >
                    Hire
                  </Button>

                  <Button
                    onClick={this.toggleContactForm}
                    variant="contained"
                    style={{ backgroundColor: "#4CAF50", color: "white" }}
                    size="large"
                  >
                    Contact me
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  ${estimated_cost}/hour
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  estimated cost
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            {this.state.showJobForm ? (
              <JobForm
                userId={this.props.auth.id}
                proId={this.state.professional.id}
                history={this.props.history}
              />
            ) : null}

            {this.state.showContactForm ? (
              <ContactForm
                toggleContactForm={this.toggleContactForm}
                email={this.state.professional.email}
                emailSent={this.emailSent}
              />
            ) : null}

            <br />
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Introduction:
            </Typography>
            <Typography variant="body1" style={{ fontSize: 15 }}>
              {introduction}
            </Typography>
            <br />
            <br />

            {this.state.reviews.length > 0 ? (
              <div>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Reviews:
                </Typography>
                <Typography variant="body1" style={{ marginBottom: 100 }}>
                  {this.renderReviews()}
                </Typography>
              </div>
            ) : (
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "grey", marginBottom: 100 }}
              >
                No reviews yet
              </Typography>
            )}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { currentUser })(ShowPro);
