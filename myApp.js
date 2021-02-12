var express = require('express');
var app = express();
var helmet = require("helmet");
const bcrypt = require("bcrypt");


seconds = 90*24*60*60
directives = {
  defaultSrc: ["'self'"], 
  scriptSrc: ["'self'", "trusted-cdn.com"]
};

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({maxAge: seconds, force: true}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({directives}));
app.use(helmet())















































module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
