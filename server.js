var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false
    }));
app.use('/', express.static(path.join(__dirname, 'app')));

var server = app.listen(8080, function () {
    console.log('Server listening on port ', server.address().port);
});