
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  /*app.use(require('connect').bodyParser());*/
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/device/:id/save', routes.saveDevice); //route to routes.saveDevice
app.post('/device/saveNewDev', routes.saveNewDevice); //route to routes.saveNewDevice
app.post('/device/:id/take', routes.takeDevice); //route to routes.takeDevice
app.get('/device/:id/edit', routes.edithis); //route to routes.edithis
app.get('/device/:id/devBack', routes.devBack); //route to routes.devBack


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
