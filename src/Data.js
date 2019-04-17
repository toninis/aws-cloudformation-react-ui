import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

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
          <List component="nav" className="Data">
            {summaries
              .filter(s => s.StackStatus === "DELETE_COMPLETE")
              .map((s, i) => {
                // return <div className="demo"> {s.StackName} </div>;
                return (
                  <React.Fragment>
                    <ListItem button onClick={this.handleClick}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary={s.StackName} />
                      {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className="Data">
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText inset primary="Starred" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              })}
          </List>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Running Demos</h3>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <List component="nav" className="Data">
          {summaries
            .filter(s => s.StackStatus === "CREATE_COMPLETE")
            .map((s, i) => {
              // return <div className="demo"> {s.StackName} </div>;
              return (
                <React.Fragment>
                  <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={s.StackName} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className="Data">
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })}
        </List>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Failed Demos</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {summaries
                .filter(
                  s =>
                    s.StackStatus === "CREATE_FAILED" ||
                    s.StackStatus === "DELETE_FAILED"
                )
                .map((s, i) => {
                  return <div className="demo"> {s.StackName} </div>;
                })}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Data);
