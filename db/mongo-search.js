'use strict';
var path = require('path');
var db = require(path.join(__dirname, '..', 'db'));

exports.getResults = function (data, callback) {
    var searchTerm = data.search;
    var collection = db.collection('kuixine');
    collection.find({
        '$text': {
            '$search': searchTerm
        }
    }, callback);
};