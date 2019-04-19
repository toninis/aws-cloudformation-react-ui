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

import * as helpers from "./functions";

const styles = theme => ({
  root: {
    width: "95%",
    "align-items": "center",
    margin: "auto"
  },
  loadmore: {
    margin: theme.spacing.unit,
    float: "right"
  },
  btext: {
    fontSize: theme.typography.pxToRem(10)
  },
  button: {
    width: "20%",
    margin: theme.spacing.unit,
    "background-color": "#FFFAFA",
    display: "flex",
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightRegular
  },
  demo: {
    width: "90%",
    margin: "auto",
    "background-color": "#DCDCDC",
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },
  expandedDemo: {
    margin: "auto",
    display: "flex",
    "background-color": "#F5F5F5",
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    "align-items": "center"
  },
  iconSmall: {
    fontSize: 20
  }
});

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

  // componentDidMount() {
  //   fetch("/demos")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         ...this.state,
  //         summaries: data.StackSummaries,
  //         isLoading: false
  //       });
  //     });
  // }

  render() {
    const summaries = this.state.summaries;
    const classes = this.props.classes;

    return (
      <div className="Data">
        <ExpansionPanel className={classes.root} onChange={this.fetchDeleted}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Deleted Demos</Typography>
          </ExpansionPanelSummary>
          {summaries
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
                      <CloudFormation className={classes.leftIcon} size={20} />
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
            })}
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
