var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app  = express();

var request = require('request'),
    cheerio = require('cheerio');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('index', {'title': 'Github 3D Contribution'});
});

app.post('/', function(req, res){
	var username = req.body['username'];
	res.redirect('/' + username);
});

app.get('/:username', function(req, res){
	var username = req.params.username;
	var self = res;

	request('https://github.com/users/' + username + '/contributions', function(err, res, body) {
		if (err) {
			console.log('没有查询到这个用户');
			return;
		}

		var $ = cheerio.load(res.body.toString());

		//console.log('Start of Body!!!!!!!');
		//console.log($('svg'));
		//console.log('End of Body!!!!!!!');

		self.render('contribution', {'source':$('svg')});
	});
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
