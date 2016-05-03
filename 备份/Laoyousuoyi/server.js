var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

app.configure( function() {
    app.use(express.bodyParser());

    app.use(express.methodOverride());

    app.use(express.static(path.join(application_root, 'site')));

    app.use(express.errorHandler({ dumpException: true, showStack: true }));
});

app.get('/', function(req, res) {
    res.send('yeah');
})

app.listen(4711, function() {
    console.log('node server is running!');
})
