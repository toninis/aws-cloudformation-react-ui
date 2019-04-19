import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloudFormation from "react-aws-icons/dist/aws/logo/CloudFormation";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as helpers from "./functions";
import styles from "./styles";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      summaries: [],
      visible: 5
    };

    this.loadMore = this.loadMore.bind(this);
    this.fetchDeleted = this.fetchDeleted.bind(this);
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 5 };
    });
  }

  fetchDeleted() {
    fetch("/demos")
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
    const classes = this.props.classes;

    return (
      <div className="Data">
        <ExpansionPanel className={classes.root} onChange={this.fetchDeleted}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Deleted Demos</Typography>
          </ExpansionPanelSummary>
          {this.state.isLoading ? (
            <CircularProgress className={classes.progress} color="secondary" />
          ) : (
            summaries
              .filter(s => s.StackStatus === "DELETE_COMPLETE")
              .slice(0, this.state.visible)
              .map(s => {
                return (
                  <ExpansionPanel className={classes.demo} key={s.StackId}>
                    <Divider />
                    <ExpansionPanelSummary
                      className={classes.heading}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <CloudFormation className={classes.leftIcon} />
                      <Typography>{s.StackName}</Typography>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails className={classes.expandedDemo}>
                      <Button
                        size="small"
                        variant="contained"
                        href={helpers.generateAWSurl(s.StackId)}
                        className={classes.button}
                      >
                        <CloudFormation
                          className={classes.leftIcon}
                          size={20}
                        />
                        <Typography className={classes.btext}>
                          Check in AWS
                        </Typography>
                      </Button>
                      <Divider variant="inset" />
                      <Typography>{s.CreationTime}</Typography>
                    </ExpansionPanelDetails>
                    <Divider />
                  </ExpansionPanel>
                );
              })
          )}
          {this.state.visible < this.state.summaries.length && (
            <Fab
              size="small"
              variant="round"
              onClick={this.loadMore}
              className={classes.loadmore}
              color="secondary"
            >
              <AddIcon className={classes.loadmore} />
            </Fab>
          )}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Data);
