'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/search', function (req, res) {
    var searchTerm = req.query.item;

});