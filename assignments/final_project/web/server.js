var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: process.env.DBUSER,
	password: process.env.DBPASS,
	database: process.env.DBNAME
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/actors', function(req, res) {
  var ctx = {};
  pool.query('SELECT * FROM actor', function(err, rows, fields) {
    if (err) {
       console.log(err);
       return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
});

app.get('/episodes', function(req, res) {
  var ctx = {};
  pool.query('SELECT * FROM episode', function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
});

app.get('/studios', function(req, res) {
  var ctx = {};
  pool.query('SELECT * FROM studio', function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
});

app.get('/series', function(req, res) {
  var ctx = {};
  pool.query('SELECT * FROM series', function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
});

app.get('/characters', function(req, res) {
  var ctx = {};
  pool.query('SELECT * FROM st_character', function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Application started on port ' + app.get('port'));
});

