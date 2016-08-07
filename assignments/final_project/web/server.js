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

var selectTableData = function(res, table) {
  var ctx = {};
  pool.query('SELECT * FROM ' + table, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = rows;
    res.send(ctx);
  });
};

app.get('/actors', function(req, res) {
  selectTableData(res, 'actor');
});

app.get('/episodes', function(req, res) {
  selectTableData(res, 'episode');
});

app.get('/studios', function(req, res) {
  selectTableData(res, 'studio');
});

app.get('/series', function(req, res) {
  selectTableData(res, 'series');
});

app.get('/characters', function(req, res) {
  selectTableData(res, 'st_character');
});

app.post('/actors', function(req, res) {
  var body = req.body;
  var fname = body.fname;
  var lname = body.lname;
  var website = body.website;
  var twitter = body.twitter;
  var updateStr = "INSERT INTO actor (fname, lname, website, twitter)";
  updateStr += " VALUES ('" + fname + "','" + lname + "','" + website + "','";
  updateStr += twitter + "');";

  pool.query(updateStr, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

app.post('/characters', function(req, res) {
  var body = req.body;
  var fname = body.fname;
  var lname = body.lname;
  var race = body.race;
  var updateStr = "INSERT INTO st_character (fname, lname, race)";
  updateStr += " VALUES ('" + fname + "','" + lname + "','" + race +"');";

  pool.query(updateStr, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

app.post('/episodes', function(req, res) {
  var body = req.body;
  var title = body.title;
  var ep_num = body.episode_number;
  var season_num = body.season_number;
  var air_date = body.air_date;
  var series_id = body.series_id;
});

app.post('/studios', function(req, res) {
  var body = req.body;
  var name = body.name;
  var address = body.address;
  var website = body.website;
  var updateStr = "INSERT INTO studio (name, address, website)";
  updateStr += " VALUES ('" + name + "','" + address + "','" + website;
  updateStr += "');";

  pool.query(updateStr, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

var deleteEntry = function(req, res, table) {
  var ctx = {};
  var id = req.body.id;
  pool.query('DELETE FROM ' + table + ' WHERE id = ' + id, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    ctx.results = JSON.stringify(rows);
    res.send(ctx);
  });
};

app.delete('/actors', function(req, res) {
  deleteEntry(req, res, 'actor');
});

app.delete('/characters', function(req, res) {
  deleteEntry(req, res, 'st_character');
});

app.delete('/studios', function(req, res) {
  deleteEntry(req, res, 'studio');
});

app.delete('/episodes', function(req, res) {
  deleteEntry(req, res, 'episode');
});

app.delete('/series', function(req, res) {
  deleteEntry(req, res, 'series');
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

