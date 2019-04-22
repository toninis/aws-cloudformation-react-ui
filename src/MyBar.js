import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Created from "./Created";
import Deleted from "./Deleted";

import AWSCloud from "react-aws-icons/dist/aws/compute/AWSCloud";
import styles from "./styles";

class MyBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, tab) {
    this.setState({ tab });
  }

  render() {
    const classes = this.props.classes;
    const value = this.state.tab;
    return (
      <div className={classes.bar}>
        <AppBar position="static">
          <Toolbar>
            <AWSCloud className={classes.menuButton} size={55} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Encode SA Current Demo Live Status
            </Typography>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Status" />
              <Tab label="Remove Demo" />
              <Tab label="Request Demo" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <br />
        {value === 0 && (
          <React.Fragment>
            <Created />
            <br />
            <Deleted />
          </React.Fragment>
        )}
        {/* value === 1 && <Deleted /> }
        {value === 2 && <Created /> */}
      </div>
    );
  }
}

export default withStyles(styles)(MyBar);
