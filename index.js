const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('routes/route');
const customerdata = require('./routes/index');
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + 'public'));

app.use('api/', route);

//connecting to Angular app
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + 'public/index.html'));
});


//Resolving CORS
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin : *");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });


app.listen(port, ()=>{
	console.log("Server started on port " +port)
})
