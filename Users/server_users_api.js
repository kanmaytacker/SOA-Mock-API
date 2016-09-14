/*
	A Mock JSON API that serves to the display for the Users table.
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var util = require('util');
var users = require('./users.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8889;
var router = express.Router();


//Middleware Logging 

router.use(function(req, res, next){
	var remote_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var date_time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	
	var log_data = util.format('%s - - [%s] "%s %s" "%s" "%s" ', remote_address, date_time, req.method, req.originalUrl, req.headers.host, req.headers['user-agent']);
	
	console.log(log_data);
	next()
})

router.get('/', function(req, res){
	res.json({message: 'Welcome to the Users API'});
})

//List all users
router.get('/users', function(req, res){
	res.json(users);
})

//Get user by UserID
router.get('/users/:id', function (req, res, next) {


  	for(var index = 0; index < users.length; index++){
  		if(users[index]['UserID'] == req.params.id){	
  			res.json(users[index]);
  			break;
  		}
	}

	if(index >= users.length){
		res.json({message: 'Not Found!'});
	}
  })

app.use('/api', router);
app.listen(port);
console.log('users API running on port ' + port);