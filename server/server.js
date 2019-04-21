const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 4000;
const router = express.Router();
const moment = require("moment");

var AWS = require("aws-sdk");
var uuid = require("uuid");

var cloudformation = new AWS.CloudFormation({
  region: "eu-west-2"
});

app.use(cors());

function fetchStacks() {
  var params = {
    StackStatusFilter: [
      "CREATE_COMPLETE",
      "DELETE_COMPLETE"
      // "CREATE_FAILED",
      // "DELETE_FAILED"
    ]
  };

  return new Promise((resolve, reject) => {
    try {
      let stacks = cloudformation.listStacks(params, function(err, data) {
        resolve(data);
      });
    } catch (err) {
      reject("Could not fetch stacks");
    }
  });
}

function removeProp(obj, propName) {
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (p == propName) {
        delete obj[p];
      } else if (typeof obj[p] == "object") {
        removeProp(obj[p], propName);
      }
    }
  }
  return obj;
}

router.get("/demos", function(req, res) {
  fetchStacks().then(function(data) {
    let data2 = removeProp(data, "DriftInformation");
    console.log("Data Fecthed!");
    res.send(data2);
  });
});

app.use(router);

app.listen(port);
