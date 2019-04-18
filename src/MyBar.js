import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import AWSCloud from "react-aws-icons/dist/aws/compute/AWSCloud";

import "./MyBar.css";
//
// function generateAWSurl(stackID) {
//   const baseUrl =
//     "https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/";
//   let newStackID = encodeURIComponent(stackID);
//   return baseUrl + newStackID + "/overview";
// }

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class MyBar extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <AWSCloud className={classes.menuButton} size={55} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Encode SA Current Demo Live Status
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(MyBar);
