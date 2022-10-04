//    Necessary Imports
//----------x----------x---------
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//    UI Components
//----------x----------x---------
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
//    Store Actions
//----------x----------x---------
import { logoutUser } from "../actions/auth";
import { updateQuery } from "../actions/professionals";
//    Misc
//----------x----------x---------
import Logo from "../logo.png";
import ProfilePic from "../profilePic.jpeg";
//    Custom Styling
//----------x----------x---------
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e9eced",
    marginBottom: 20,
  },
  logo: {
    flexGrow: 1,
  },
  menuButton: {
    color: "#757575",
    marginRight: theme.spacing(2),
  },
  button: {
    color: "white",
    backgroundColor: "#4CAF50",
    marginRight: 10,
  },
  navBar: {
    backgroundColor: "white",
  },
  menu: {
    display: "flex",
  },
  profilePic: {
    border: "1px solid green",
  },
}));

//    Functional Component Navbar
//----------x----------x---------
function Navbar(props) {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.logoutUser();
    history.push("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    props.updateQuery(event.target.innerText);
    history.push("/results");
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" elevation={0} className={classes.navBar}>
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/search">
              <img width="40" height="40" src={Logo} />
            </Link>
          </div>

          {props.auth ? (
            <div className={classes.menu}>
              <Button
                className={classes.menuButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Explore
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Personal Trainer</MenuItem>
                <MenuItem onClick={handleClose}>Electricians</MenuItem>
                <MenuItem onClick={handleClose}>App Developers</MenuItem>
                <MenuItem onClick={handleClose}>House Cleaners</MenuItem>
              </Menu>

              <Button
                component={Link}
                to="/jobs"
                className={classes.menuButton}
              >
                Active Jobs
              </Button>

              <Button className={classes.menuButton} onClick={handleLogout}>
                Logout
              </Button>
              <Avatar
                className={classes.profilePic}
                src={props.auth.img_url}
              ></Avatar>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                className={classes.button}
                href="/join"
              >
                Join as a Pro
              </Button>
              <Button className={classes.menuButton} href="/register">
                Register
              </Button>
              <Button className={classes.menuButton} href="/login">
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(
  connect(mapStateToProps, { logoutUser, updateQuery })(Navbar)
);
