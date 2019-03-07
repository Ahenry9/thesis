// Creating your own Web server with nodejs.
var express = require('express')
var app = express()
var http = require('http');     // Alternate mechanisim: import * as http from 'http';
var url = require('url');       // import * as url from 'url';
var fs = require('fs');         // import * as fs from 'fs';
var path = require('path');     // import * as path from 'path';

var fileExtensions = {
     ".html":    "text/html",
     ".css":     "text/css",
     ".js":      "text/javascript",
     ".jpeg":    "image/jpeg",
     ".jpg":     "image/jpeg",
     ".png":     "image/png"
 };

var server = http.createServer(function(request, response) { 
    var pathname = url.parse(request.url).pathname;
    var filename;

    //console.log("\n\nURL: " + url.toString());
    //console.log("Request.url: " + request.url.toString());
    //console.log("Pathname: " + pathname);

    if(pathname === "/") {
        // change the 'filename' to the homepage of your website (e.g. "index.html") 
        filename = "index.html"; 

        //console.log("FileName: " + filename);
    }
    else
        filename = path.join(process.cwd(), pathname);

        //console.log("Current Working Directory: " + process.cwd().toString());

    try {
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var typeAttribute = fileExtensions[path.extname(filename)];

        //console.log("File extension: " + path.extname(filename));
        //console.log("Type Attribute: " + typeAttribute);

        response.writeHead(200, {'Content-Type': typeAttribute});
        fileStream.pipe(response);

    }
    catch(e) {
            console.log('File does not exist: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
            return;
    }
    return;
    
});

server.listen(5000);

console.log("Listening on port: 5000");















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
      result = JSON.stringify(result);
      app.get('/data', function data(req, res) {
        if (error){
          response.status(400).send('error in database operation');
        }
        else{
          res.send(result)
        }
        
      console.log(result)
      })
    };
  });
});
sql.on('error', err => { // Connection bad.
  console.log("Bad");
  console.log("  Error: "+ err);
});

