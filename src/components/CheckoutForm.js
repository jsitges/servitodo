import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import {
  Container,
  FormGroup,
  Button,
  TextField,
  Card,
  CardContent,
  CssBaseline,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      estimated_cost: props.props.match.params.estimatedCost,
      total: "",
      quantity: "",
      isProcessing: false,
      img_url: "",
    };
  }

  componentDidMount() {
    this.checkForToken();
    const proId = this.props.props.match.params.professionalId;
    fetch(`https://shrouded-retreat-77877.herokuapp.com/professionals/${proId}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          img_url: response.professional.img_url,
        });
      });
  }

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
        .then((response) => {
          if (response.error) {
            this.props.props.history.push("/login");
          } else {
            this.props.props.currentUser(response);
          }
        });
    }
  };

  handleSubmit = async (event) => {
    this.setState({
      isProcessing: true,
    });
    event.preventDefault();
    const { stripe, elements } = this.props;

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: this.state.name,
      },
    });

    this.handlePaymentMethodResult(result);
  };

  handlePaymentMethodResult = async (result) => {
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      const response = await fetch(
        "https://shrouded-retreat-77877.herokuapp.com/pay",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_method_id: result.paymentMethod.id,
            amount: this.state.total,
          }),
        }
      );

      const serverResponse = await response.json();

      this.handleServerResponse(serverResponse);
    }
  };

  handleServerResponse = (serverResponse) => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
    } else {
      // Show a success message

      this.props.props.history.push("/jobs");
    }
  };

  handleCardChange = (event) => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  };

  handleQtyChange = (e) => {
    const newTotal = e.target.value * this.state.estimated_cost;
    this.setState({
      quantity: e.target.value,
      total: newTotal,
    });
  };

  render() {
    console.log("Props", this.props);
    const { stripe } = this.props;
    const textfieldStyle = { paddingBottom: 20 };

    const cardStyle = { padding: 10, margin: 20, textAlign: "center" };
    const image = { width: 188, height: 188, margin: 10, marginBottom: "25px" };
    const img = {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "50%",
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Pay
          </Typography>
          <Card style={cardStyle}>
            <CardContent>
              <ButtonBase style={image}>
                {this.state.img_url ? (
                  <img style={img} alt="complex" src={this.state.img_url} />
                ) : null}
              </ButtonBase>

              <FormGroup onSubmit={this.handleSubmit}>
                <TextField
                  autofocus
                  helperText="Please enter the amount of hours you agreed to."
                  type="number"
                  label="Hours agreed"
                  variant="outlined"
                  name="quantity"
                  onChange={this.handleQtyChange}
                  style={textfieldStyle}
                />

                <CardElement onChange={this.handleCardChange} />
                {this.state.quantity < 1 ? null : (
                  <Typography variant="textSecondary" style={{ marginTop: 20 }}>
                    Total: ${this.state.total}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  onClick={this.handleSubmit}
                  disabled={!stripe}
                  style={{
                    color: "white",
                    backgroundColor: "#4CAF50",
                    marginTop: 20,
                  }}
                >
                  {this.state.isProcessing ? "Processing..." : "Submit Payment"}
                </Button>
              </FormGroup>
            </CardContent>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} props={props} />
      )}
    </ElementsConsumer>
  );
}

export default connect(null, { currentUser })(InjectedCheckoutForm);
