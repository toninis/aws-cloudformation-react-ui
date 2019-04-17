import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import "./Data.css";

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

  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  componentDidMount() {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          summaries: data.StackSummaries,
          isLoading: false
        });
      });
  }

  render() {
    const summaries = this.state.summaries;
    // console.log(this.state);
    return (
      <div className="Data">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Deleted Demos</h3>
          </ExpansionPanelSummary>
          {summaries
            .filter(s => s.StackStatus === "DELETE_COMPLETE")
            .map((s, i) => {
              // return <div className="demo"> {s.StackName} </div>;
              return (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="demo">
                      <Typography className="Data">{s.StackName}</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="Data">
                    <div className="Data" />
                    <div className="Data">
                      <Chip
                        label="Barbados"
                        className="Data"
                        onDelete={() => {}}
                      />
                    </div>
                    <div className="Data">
                      <Typography variant="caption">
                        Select your destination of choice
                        <br />
                        <a href="#sub-labels-and-columns" className="Data">
                          Learn more
                        </a>
                      </Typography>
                    </div>
                  </ExpansionPanelDetails>
                  <Divider />
                </ExpansionPanel>
              );
            })}
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Running Demos</h3>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {summaries
          .filter(s => s.StackStatus === "CREATE_COMPLETE")
          .map((s, i) => {
            // return <div className="demo"> {s.StackName} </div>;
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="demo">
                    <Typography className="Data">{s.StackName}</Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="Data">
                  <div className="Data" />
                  <div className="Data">
                    <Chip
                      label="Barbados"
                      className="Data"
                      onDelete={() => {}}
                    />
                  </div>
                  <div className="Data">
                    <Typography variant="caption">
                      Select your destination of choice
                      <br />
                      <a href="#sub-labels-and-columns" className="Data">
                        Learn more
                      </a>
                    </Typography>
                  </div>
                </ExpansionPanelDetails>
                <Divider />
              </ExpansionPanel>
            );
          })}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Failed Demos</h3>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {summaries
          .filter(
            s =>
              s.StackStatus === "CREATE_FAILED" ||
              s.StackStatus === "DELETE_FAILED"
          )
          .map((s, i) => {
            // return <div className="demo"> {s.StackName} </div>;
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="demo">
                    <Typography className="Data">{s.StackName}</Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="Data">
                  <div className="Data" />
                  <div className="Data">
                    <Chip
                      label="Barbados"
                      className="Data"
                      onDelete={() => {}}
                    />
                  </div>
                  <div className="Data">
                    <Typography variant="caption">
                      Select your destination of choice
                      <br />
                      <a href="#sub-labels-and-columns" className="Data">
                        Learn more
                      </a>
                    </Typography>
                  </div>
                </ExpansionPanelDetails>
                <Divider />
              </ExpansionPanel>
            );
          })}
      </div>
    );
  }
}

export default withStyles(styles)(Data);
