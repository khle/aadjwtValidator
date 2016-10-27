var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    rx = require('rx'),
    restler = require('restler'),
    jwtaadUtils = require('./jwtaadUtils');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false
    }));
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/validate/', function (req, res) {
    console.log(req.jwt);
    res.status(200).json({data: "ok"});
});

var server = app.listen(8080, function () {
    console.log('Server listening on port ', server.address().port);
    console.log(rx);
    console.log(restler);
    console.log(jwtaadUtils);
});