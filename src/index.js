import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MyBar from "./MyBar";
import Created from "./Created";
import Deleted from "./Deleted";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<MyBar />, document.getElementById("MyBar"));
ReactDOM.render(<Created />, document.getElementById("Created"));
ReactDOM.render(<Deleted />, document.getElementById("Deleted"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
