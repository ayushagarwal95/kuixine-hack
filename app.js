'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('express-mongo-db');
var bodyParser = require('body-parser');

var app = express();

var index = require(path.join(__dirname, 'routes', 'index'));

var mongodbOptions = {
    hosts: [{
        host: process.env.MONGODB_HOST || '127.0.0.1',
        port: process.env.MONGODB_PORT || '27017'
    }],
    database: process.env.MONGODB_DATABASE || 'kuixine',
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    options: {
        db: {
            native_parser: true,
            recordQueryStats: true,
            retryMiliSeconds: 500,
            numberOfRetries: 10
        },
        server: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 10000
            },
            auto_reconnect: true,
            poolSize: 50
        }
    }
};
app.use(mongodb(require('mongodb'), mongodbOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stack trace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stack traces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;