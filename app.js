'use strict'

var app_name = 'Example';
var morgan = require('morgan')
var fs = require('fs');
var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').Server(app);

app.port = 8010;

app.use(express.static('public'));
app.set('port', app.port);
app.use(morgan('dev'));

let routes_path = `${__dirname}/routes`;
fs.readdirSync(routes_path).forEach(file => {
    let arrRouteSplit = file.split('.');
    if (arrRouteSplit[0]) {
        require(`./routes/${arrRouteSplit[0]}`)(app, router);
    }
});

app.use('/', router);

server.listen(app.get('port'), () => {
    console.log(`\n${app_name} server running on http://localhost:${app.get('port')}`);
});
