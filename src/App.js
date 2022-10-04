//    Necessary Imports
//----------x----------x---------
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
//    Custom Components
//----------x----------x---------
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ResultsPage from "./components/Results";
import ShowPro from "./components/ShowPro";
import Register from "./components/Register";
import ActiveJobs from "./components/ActiveJobs";
import Join from "./components/Join";
import Footer from "./components/Footer";
import ReviewContainer from "./components/ReviewContainer";
//    UI Components
//----------x----------x---------
import { CssBaseline } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
//    Stripe Components
//----------x----------x---------
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51HG8RACtDv3nRJYWEyl9q37adYz6rplFKBtKANYFRW95p6W6Y0YLQqnwkraMkJVeIOKFqhi3eylsJAVn6OV57I2Q00RIllbMjH"
);

function App() {
  return (
    <Router>
      <CssBaseline />
      <Elements stripe={stripePromise}>
        <div className="App">
          <div id="page-container">
            <Alert severity="info" color="success">
              Welcome! Servitodo was built to help people affected by COVID-19.
            </Alert>
            <Navbar />
            <div id="content-wrap">
              <Switch>
                <Route
                  path="/login"
                  render={(routerProps) => <Login {...routerProps} />}
                />
                <Route path="/register" component={Register} />
                <Route
                  exact
                  path="/search"
                  render={(routerProps) => <Dashboard {...routerProps} />}
                />
                <Route exact path="/join" component={Join} />
                <Route
                  exact
                  path={"/jobs/:jobId/review/:professionalId"}
                  render={(routerProps) => <ReviewContainer {...routerProps} />}
                />
                <Route exact path="/jobs" component={ActiveJobs} />
                <Route
                  exact
                  path="/results/:professionalId/pay/:estimatedCost"
                  render={(routerProps) => <CheckoutForm {...routerProps} />}
                />
                <Route
                  exact
                  path={"/results/:professionalId"}
                  render={(routerProps) => <ShowPro {...routerProps} />}
                />
                <Route
                  exact
                  path="/results"
                  render={(routerProps) => <ResultsPage {...routerProps} />}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </Elements>
    </Router>
  );
}

export default App;
