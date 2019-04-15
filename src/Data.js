import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      summaries: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          summaries: data.StackSummaries,
          isLoading: false
        });
      });
  }

  render() {
    const summaries = this.state.summaries;
    console.log(this.state);
    return (
      <div className="Data">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={"+"}>
            <h3>DELETE_COMPLETE</h3>
          </ExpansionPanelSummary>
          <div>
            {summaries
              .filter(s => s.StackStatus === "DELETE_COMPLETE")
              .map((s, i) => {
                return <li>{s.StackName}</li>;
              })}
          </div>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={"+"}>
            <h3>CREATE_COMPLETE</h3>
          </ExpansionPanelSummary>
          <div>
            {summaries
              .filter(s => s.StackStatus === "CREATE_COMPLETE")
              .map((s, i) => {
                return <li>{s.StackName}</li>;
              })}
          </div>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={"+"}>
            <h3>CREATE_FAILED</h3>
          </ExpansionPanelSummary>
          <div>
            {summaries
              .filter(s => s.StackStatus === "CREATE_FAILED")
              .map((s, i) => {
                return <li>{s.StackName}</li>;
              })}
          </div>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={"+"}>
            <h3>DELETE_FAILED</h3>
          </ExpansionPanelSummary>
          <div>
            {summaries
              .filter(s => s.StackStatus === "DELETE_FAILED")
              .map((s, i) => {
                return <li>{s.StackName}</li>;
              })}
          </div>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Data);
