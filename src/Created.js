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

import "./Created.css";

import * as helpers from "./functions";

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

class Created extends Component {
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
      <div className="Created">
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
                      href={helpers.generateAWSurl(s.StackId)}
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
      </div>
    );
  }
}

export default withStyles(styles)(Created);
