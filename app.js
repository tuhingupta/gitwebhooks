
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./server/routes'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

var api = require('./server/routes/api')();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/client');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.json())
app.use(methodOverride());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/client/js',  express.static(__dirname + '/client/js'));
app.use('/client/css',  express.static(__dirname + '/client/css'));
app.use('/client',  express.static(__dirname + '/client'));
app.use('/views',  express.static(__dirname + '/client/views'));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorhandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
//app.get('/', routes.index);
//app.get('/partials/:name', routes.partials);

// JSON API
//app.get('/api/name', api.name);

app.use('/api',api);

// redirect all others to the index (HTML5 history)
app.use("*",function(req,res){
    res.sendfile(path.join(__dirname,"/client/index.html"));
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
