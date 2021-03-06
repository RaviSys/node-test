var express = require('express');
var app = express();
var bodyparser = require('body-parser')
var mw = require('./middlewares/configurable.js')
app.set('view engine', 'pug');
app.set('views','./views');
var myLogger = (req, res, next) => {
  console.log("Logged")
  next()
}

var requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  console.log(req.requestTime)
  next()
}

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd/'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(myLogger)
app.use(requestTime)

app.use(mw({option1: 1, option2: 2, option3: 3}))

app.use( bodyparser.json() )
app.use(bodyparser.urlencoded({
  extended: true
})); 

app.use(express.json())
app.use(express.urlencoded())


app.get('/', function(req, res) {
  res.render('index', {title: "Express Practice", message: "Hello Express"});
});

app.get('/register', (req, res) => {
  console.log(req.body.name)
  res.render('auth/register', { title: 'Register Account | Express Practice', message: 'Register Here' })
});


app.listen(8080);
