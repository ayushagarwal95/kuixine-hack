'use strict';

var express = require('express');
var path = require('path');
var mongoClient = require('mongodb').MongoClient;

var app = express();

var index = require(path.join(__dirname, 'routes', 'index'));

var mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/kuixine';
var mongoOptions = {
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
};
mongoClient.connect(mongoURI, mongoOptions);
//TODO - connect this instance with app


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
// Development error handler, will print stack-trace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        if (log) {
            log.log('debug', {Error: err, Message: err.message});
        }
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    });
}

// Production error handler, no stack-traces leaked to user
app.use(function (err, req, res) {
    if (log) {
        log.log('debug', {Error: err, Message: err.message});
    }
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        stack: ''
    });
});

module.exports = app;