var express = require('express');
var app = express();
var GithubApi = require('github');

var github = new GithubApi({
  version: '3.0.0',
  protocol: 'https'
});

app.use(express.compress())
   .use(express.urlencoded())
   .use(express.json())
   .use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.get('/user/:name', function (req, res) {
  res.render('index.jade');
});

app.post('/user', function (req, res) {
  github.repos.getFromUser( { user: req.body.username }, function (err, data) {
    languages = {}
    for (repo in data) {
      if (!(data[repo].language in languages)) {
        languages[data[repo].language] = 1;
      }
      else {
        languages[data[repo].language]++;
      }
    }
    delete languages['undefined'];
    res.send(languages);
  });
  // github.user.getFrom( { user: req.body.username }, function(err, result) {
  //   if (err) {
  //     res.send(err);
  //   }
  //   else {
  //     res.send('<img src=' + result.avatar_url + '/>');
  //   }
  // })
});

app.listen(9001);
