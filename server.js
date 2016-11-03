var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    jwtValidator = require('./jwtValidator');

var app = express();

function validate(jwt, cb) {
  var result = [];
  var observable = jwtValidator.validate(jwt);
  observable.subscribe(
    response => {
      result.push(response);
    }, 
    error => {
      console.error(error);
    }, 
    () => {      
      cb(result);
    }); 
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/validate/', function (req, res) {
  var result = validate(req.body.jwt, function(result) {
    console.log(result);
    res.send(result); 
  });
});

var server = app.listen(5003, function () {
    console.log('Server listening on port ', server.address().port);
});