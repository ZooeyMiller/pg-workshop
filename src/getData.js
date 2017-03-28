const dbConnection = require("../database/db_connect.js");

const getData = (cb) =>{
  dbConnection.query("SELECT * FROM users"
    , (err, res) => {
      if (err) cb(err);
      cb(null, res.rows);
    });
};

module.exports = getData;
