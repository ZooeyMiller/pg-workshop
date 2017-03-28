const dbConnection = require("../database/db_connect.js");

const addRow = (request, cb) => {
  // dbConnection(`INSERT INTO users (username, password) VALUES (${})`)
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () =>{
    console.log(data);
    data = data.split("&");
    data = data.map((e) => {
      return e.split("=")[1];
    });
    console.log(data);
    dbConnection.query(`INSERT INTO users (username, password) VALUES ('${data[0]}', '${data[1]}');`);
    cb();
  });
};

module.exports = addRow;
