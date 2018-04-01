var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    
   fs.readFile(path.resolve("./src/content/data.json"), 'utf8', function (err, data) {
       res.end( data );
   });
})

app.post('/updatePrice', function (req, res) {
    
    var updatedData;
    for(var key in req.body){
        console.log(req.body[key])
        updatedData = key
    }

    
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    
    fs.writeFile('./src/content/data.json', updatedData, (err) => {  
        if (err) throw err;
        console.log('Data written to file');
        res.end( "Price updated successfully!!" );
    });



})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://localhost:",port)

})