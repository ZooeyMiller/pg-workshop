const http = require("http");
const users = require("./static.js");
const fs = require("fs");
const getData = require("./getData.js");
const addRow = require("./addRow.js");

const handler = (request, response) => {
  const endpoint = request.url.split("/")[1];

  if (endpoint === "") {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  } else if (endpoint === "users") {
    // TASK 1: replace the 3 lines below below with your own function that gets data from your database
    getData((err, res) => {
      let data;
      if(err) {
        data = err.toString();
        response.writeHead(500, {"Content-Type": "text/html"});
      } else {
        data = JSON.stringify(res);
        response.writeHead(200, {"Content-Type":"application/json"});
      }
      response.end(data);
    });
  } else if(endpoint === "create-user"){
    addRow(request, () => {
      response.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile(__dirname + "/../public/index.html", function(error, file) {
        if(error) {
          console.log(error);
          return;
        } else {
          response.end(file);
        }

      });
    });
  } else {
    const fileName = request.url;
    const fileType = request.url.split(".")[1];
    response.writeHead(200, {"Content-Type": "text/" + fileType});
    fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  }
};

module.exports = handler;
