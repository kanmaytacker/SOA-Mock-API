/*
	A Mock JSON API that serves to display Doctors table and gets the Users 
	table in a service oriented architecture.
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var util = require('util');
var doctors = require('./doctors.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;
var router = express.Router();


//Middleware Logging
router.use(function(req, res, next){
	var remote_address = req.headers['x-forwarded-for'] || req.connection.
		remoteAddress;
	var date_time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,
	 '');
	
	var log_data = util.format('%s - - [%s] "%s %s" "%s" "%s" ', remote_address,
	 date_time, req.method, req.originalUrl, req.headers.host,
	  req.headers['user-agent']);
	
	console.log(log_data);
	next();
})

router.get('/', function(req, res){
	res.json({message: 'Welcome to the Doctors API'});
})

//List all doctors
router.get('/doctors', function(req, res){
	res.json(doctors);
})

//Get doctor by DoctorID
router.get('/doctors/:id', function (req, res, next) {


  	for(var index = 0; index < doctors.length; index++){
  		if(doctors[index]['DoctorID'] == req.params.id){	
  			res.json(doctors[index]);
  			break;
  		}
	}
	
	if(index >= doctors.length){
		
		res.json({message: 'Not Found!'});
	}
  })

//List all users by sending a GET request to the Users API
router.get('/users', function(req, res){
	request.get('http://localhost:8889/api/users/', function(err, response, body){
		if(err)
			response.json({Error: err});
		
		if(response.statusCode==200)
			res.json(JSON.parse(body));
		else{
			res.json({error : 'Could Not Complete Request'});
		}
	})
})

//Get user by UserID by sending a GET request to the Users API
router.get('/users/:id', function(req, res){
	request.get('http://localhost:8889/api/users/'+req.params.id, function(err,
	 response, body){
		if(err)
			response.json({Error: err});
		
		if(response.statusCode==200)
			res.json(JSON.parse(body));
		else{
			res.json({error : 'Could Not Complete Request'});
		}
	})
})


app.use('/api', router);
app.listen(port);
console.log('Doctors API running on port ' + port);