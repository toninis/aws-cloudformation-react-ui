import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import AWSIcon from "react-aws-icons/dist/aws/logo/AWS";
import CloudFormation from "react-aws-icons/dist/aws/logo/CloudFormation";

import Button from "@material-ui/core/Button";

// import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import "./Data.css";

function generateAWSurl(stackID) {
  const baseUrl =
    "https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/";
  let newStackID = encodeURIComponent(stackID);
  return baseUrl + newStackID + "/overview";
}

const styles = theme => ({
  root: {
    width: "95%",
    "align-items": "center"
  },
  br: {
    "line-height": "1px"
  },
  button: {
    margin: theme.spacing.unit,
    display: "flex",
    fontSize: theme.typography.pxToRem(10)
  },
  demo: {
    width: "90%",
    "align-items": "center",
    "background-color": "#f1f1f1",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expandedDemo: {
    width: "80%",
    "align-items": "center",
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
  rightIcon: {
    marginLeft: theme.spacing.unit
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
    const classes = this.props.classes;

    return (
      <div class="Data">
        <ExpansionPanel defaultExpanded className={classes.root}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Running Demos</Typography>
          </ExpansionPanelSummary>
          {summaries
            .filter(s => s.StackStatus === "CREATE_COMPLETE")
            .map(s => {
              return (
                <ExpansionPanel className={classes.demo}>
                  <Divider />
                  <ExpansionPanelSummary
                    className={classes.heading}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <CloudFormation className={classes.leftIcon} />
                    <Typography className={classes.demo} key={s.StackId}>
                      {s.StackName}
                    </Typography>
                  </ExpansionPanelSummary>
                  <Divider />
                  <ExpansionPanelDetails className={classes.expandedDemo}>
                    <Button
                      variant="contained"
                      href={generateAWSurl(s.StackId)}
                      className={classes.button}
                    >
                      <CloudFormation className={classes.leftIcon} size={48} />
                      Go to AWS
                    </Button>
                    <Divider variant="inset" />
                    <Typography
                      className={classes.expandedDemo}
                      key={s.StackId}
                    >
                      {s.CreationTime}
                    </Typography>
                  </ExpansionPanelDetails>
                  <Divider />
                </ExpansionPanel>
              );
            })}
        </ExpansionPanel>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Deleted Demos</Typography>
          </ExpansionPanelSummary>
          {summaries
            .filter(s => s.StackStatus === "DELETE_COMPLETE")
            .map(s => {
              return (
                <ExpansionPanel className={classes.demo}>
                  <Divider />
                  <ExpansionPanelSummary
                    className={classes.heading}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <CloudFormation className={classes.leftIcon} />
                    <Typography className={classes.demo} key={s.StackId}>
                      {s.StackName}
                    </Typography>
                  </ExpansionPanelSummary>
                  <Divider />
                  <ExpansionPanelDetails className={classes.expandedDemo}>
                    <Button
                      variant="contained"
                      href={generateAWSurl(s.StackId)}
                      className={classes.button}
                    >
                      <CloudFormation className={classes.leftIcon} size={48} />
                      Go to AWS
                    </Button>
                    <Divider variant="inset" />
                    <Typography
                      className={classes.expandedDemo}
                      key={s.StackId}
                    >
                      {s.CreationTime}
                    </Typography>
                  </ExpansionPanelDetails>
                  <Divider />
                </ExpansionPanel>
              );
            })}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Data);
