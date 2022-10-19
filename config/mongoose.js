const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/ers");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to Mongodb"));

db.once('open',function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;