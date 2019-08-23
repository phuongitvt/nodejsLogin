// reads in our .env file and makes those values available as environment variables
require('dotenv').config();
 
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/main');
const secureRoutes = require('./routers/secure');
const cookieParser = require('cookie-parser');
const passport = require('passport');
 
// create an instance of an express app
const app = express();
 
// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(cookieParser());

// require passport auth
require('./auth/auth');
app.use(express.static(__dirname + '/public'));

app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
// main routes
	
app.use('/', routes);
	
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);
//app.use('/', secureRoutes);
 
// catch all other routes
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});
 
// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});
 
// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});