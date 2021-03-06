'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var mongoSearch = require(path.join(__dirname, '..', 'db', 'mongo-search'));

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/search', function (req, res) {
    var searchTerm = req.body.searchItem.toLowerCase();
    var data = {
        db: req.db,
        search: searchTerm
    };
    var onSearch = function (err, docs) {
        if (err) {
            console.log('error occurred: ' + err);
            res.render('results', {message: 'Error Occurred'});
            //do something
        }
        else {
            if (docs.length === 0) {
                res.render('results', {message: 'No results found'});
            }
            else {
                docs = JSON.stringify(docs);
                res.render('results', {response: docs, message: null});
            }
        }
    };
    mongoSearch.getResults(data, onSearch);
});

module.exports = router;