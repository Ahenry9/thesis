var express = require('express')
var app = express()
var http = require('http');     // Alternate mechanisim: import * as http from 'http';
var url = require('url');       // import * as url from 'url';
var fs = require('fs');         // import * as fs from 'fs';
var path = require('path');

var sql = require('mssql/msnodesqlv8');
var config = {
  connectionString: 'Driver=SQL Server;Server=FREDDYS-PC\\SQLEXPRESS;Database=master;Trusted_Connection=true;'
};
sql.connect(config, err => {
  new sql.Request().query('SELECT PositionID FROM data2', (err, result) => {
    console.log("Works");
    if(err) { // SQL error, but connection OK.
      console.log("  Error: "+ err);
      JSON.stringify(err);
    } else { // All good.
      console.dir(result);
      //result = JSON.stringify(result);
      app.post('/', function data(req, res, next) {
        res.send(result)
      console.log(result)
      })
    };
  });
});
sql.on('error', err => { // Connection bad.
  console.log("Bad");
  console.log("  Error: "+ err);
});
