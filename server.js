//console.log('Welcome to node.js environment');

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./app/routes');

var monk = require('monk');
var db = monk('localhost:27017/user-list-db');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ express: true }));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/api', routes);

app.use('/js', express.static(__dirname + '/public/js'));

app.listen(3000, function () {
    console.log('listening on port 3000');
});