var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    jwtValidator = require('./jwtValidator');

var app = express();

function foo(jwt, cb) {
  var result = [];
  var observable = jwtValidator.validate(jwt);
  observable.subscribe(
    response => {
      //console.log(response);
      result.push(response);
    }, 
    error => {
      console.error(error);
    }, 
    () => {
      //console.log('done');
      console.log(result);
      console.log('Jyst a test');        
      cb(result);
    }); 
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/validate/', function (req, res) {
  var result = foo(req.body.jwt, function(result) {
    console.log(result);
    res.send(result); 
  });
});

var server = app.listen(5003, function () {
    console.log('Server listening on port ', server.address().port);
    console.log(rx);
    console.log(restler);
    console.log(jwtaadUtils);
});