var mongojs = require('mongojs');

var mongoURI = process.env.MONGOLAB_URI || 'localhost:27017/kuixine';

var db = mongojs.connect(mongoURI);

module.exports = db;