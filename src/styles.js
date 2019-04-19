const styles = theme => ({
  "@keyframes menuButton-spin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },
  bar: {
    width: "100%",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    animation: "menuButton-spin infinite 2s linear",
    "pointer-events": "none"
  },
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
  },
  progress: {
    marginLeft: "50%",
    position: "relative",
    width: "100%"
  }
});

export default styles;
