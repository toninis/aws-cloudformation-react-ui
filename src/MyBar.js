import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AWSCloud from "react-aws-icons/dist/aws/compute/AWSCloud";

const styles = theme => ({
  "@keyframes menuButton-spin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },
  root: {
    width: "100%",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    animation: "menuButton-spin infinite 2s linear",
    "pointer-events": "none"
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
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(MyBar);
