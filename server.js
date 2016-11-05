var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    https = require('https'),
    fs = require('fs'),
    jwtValidator = require('./jwtValidator');

var options = {
    key:    fs.readFileSync('certs/aadjwt_codeprototype_com.key'),
    cert:   fs.readFileSync('certs/aadjwt_codeprototype_com.crt'),
    ca:     fs.readFileSync('certs/ca_bundle.crt'),
    requestCert:        true,
    rejectUnauthorized: false
};

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
//app.use('/.well-known/acme-challenge', express.static(__dirname + '/.well-known/acme-challenge'));
app.use('/validate/', function (req, res) {
  var result = validate(req.body.jwt, function(result) {
    console.log(result);
    res.send(result); 
  });
});

var server = https.createServer(options, app).listen(5003, function () {
    console.log('Server listening on port ', server.address().port);
});