
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var mysql = require('mysql');
var sql = require('mssql/msnodesqlv8');
var config = {
  connectionString: 'Driver=SQL Server;Server=FREDDYS-PC\\SQLEXPRESS;Database=master;Trusted_Connection=true;'
};
sql.connect(config, err => {
  new sql.Request().query('SELECT SkillName,PositionID, PositionName, Location, CompanyName, url, IndustryName, Creative, Integrity, [Self-Motivated], Helpful, Analytical, Planning, Social, Efficient, Mentoring, Respectful  FROM [2-21-19 Descriptions 2]', (err, result) => {
    console.log("Works");
    if(err) { // SQL error, but connection OK.
      console.log("  Error: "+ err);
      JSON.stringify(err);
    } else { // All good.
      console.dir(result);
      result = JSON.stringify(result);
      
      // CORS
      app.use(function(req, res, next){
      	var origin = req.headers.origin;
      	res.setHeader('Access-Control-Allow-Origin',"*");
      	// console.log(origin)
      	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
		res.header('Access-Control-Allow-Credentials', true);
		next();
      });



      app.get('/data',function(req,res){
		res.send(result);
		});
      }
    });
  });

app.listen(5000);