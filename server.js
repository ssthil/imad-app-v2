var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var config = {
  host: 'db.imad.hasura-app.io',
  user: 'ssthil',
  password: 'db-ssthil-16279'||process.env.DB_PASSWORD,
  database: 'ssthil',
};

var pool = new Pool(config);


var app = express();
app.use(morgan('combined'));


//connect datatbase
app.get('/test-db', function(req, res){
    //result
    pool.query('SELECT * FROM test', function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
           /* if(result.rows.length === 0) {
                res.status(400).send('Article not found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }*/
            res.send(JSON.stringify(result.rows));
        }
    })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function(req, res) {
   counter = counter + 1;
   res.send(counter.toString());
})

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names =[];
app.get('/submit-name', function (req, res) {
    var name = req.query.name;
    names.push(name);
    //JSON
    res.send(JSON.stringify(names));
})

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
