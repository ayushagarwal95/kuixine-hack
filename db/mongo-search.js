'use strict';

exports.getResults = function (data, callback) {
    var searchTerm = data.search;
    var collection = data.db.collection('kuixine');
    collection.find({
        '$text': {
            '$search': searchTerm
        }
    }, callback);
};