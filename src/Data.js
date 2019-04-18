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
    "align-items": "center",
    margin: "auto"
  },
  btext: {
    fontSize: theme.typography.pxToRem(10)
  },
  button: {
    width: "20%",
    margin: theme.spacing.unit,
    "background-color": "#F8F8FF",
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
    width: "100%",
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
      <div className="Data">
        <ExpansionPanel defaultExpanded className={classes.root}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Running Demos</Typography>
          </ExpansionPanelSummary>
          {summaries
            .filter(s => s.StackStatus === "CREATE_COMPLETE")
            .map(s => {
              return (
                <ExpansionPanel className={classes.demo} key={s.StackId}>
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
                      href={generateAWSurl(s.StackId)}
                      className={classes.button}
                    >
                      <CloudFormation className={classes.leftIcon} size={20} />
                      <Typography align="inherit" className={classes.btext}>
                        Check @ AWS
                      </Typography>
                    </Button>
                    <Divider variant="inset" />
                    <Typography>{s.CreationTime}</Typography>
                  </ExpansionPanelDetails>
                  <Divider />
                </ExpansionPanel>
              );
            })}
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Deleted Demos</Typography>
          </ExpansionPanelSummary>
          {summaries
            .filter(s => s.StackStatus === "DELETE_COMPLETE")
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
                      href={generateAWSurl(s.StackId)}
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
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Data);
