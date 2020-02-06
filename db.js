var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TokenBasedApp', { useMongoClient: true }); //Connecting to db