import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AWSCloud from "react-aws-icons/dist/aws/compute/AWSCloud";
import styles from "./styles";

class MyBar extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.bar}>
        <AppBar position="static">
          <Toolbar>
            <AWSCloud className={classes.menuButton} size={55} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Encode SA Current Demo Live Status
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(MyBar);
