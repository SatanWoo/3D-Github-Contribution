var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app  = express();

var https = require('https'),
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
	if (username == 'favicon.ico') return;

	var self = res;
	var url = 'https://github.com/users/' + username + '/contributions';

	https.get(url, function(res) {
			var body = '';

			res.on('data', function(chunk) {
			    body += chunk;
		    });

		    res.on('end', function() {
			    self.render('contribution', {'source':body});
		    });
		}).on('error', function(e){
		console.log(e);
	});
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
