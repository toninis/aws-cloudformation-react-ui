import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  footer: {
    bottom: 0,
    position: "relative",
    width: "100%",
    padding: "1rem",
    margin: "0.5rem 1rem",
    "text-align": "center"
  }
});

class Footer extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.footer}>
        Created by Antonis Stamatiou
        <br />
        Contact information :{" "}
        <a href="mailto:stamatiou.antonis@protonmail.com">
          stamatiou.antonis@protonmail.com
        </a>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
