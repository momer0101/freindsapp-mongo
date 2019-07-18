var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var events = require('events');
var mailer = require('./config/mailer');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('UserEvent', function(user){
    mailer.sendEmail(user);
});
global.eventEmitter = eventEmitter;
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
mongoose.connect('mongodb+srv://root:root@cluster0-oeifm.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./app/routes.js')(app, passport, eventEmitter);
app.listen(port);
console.log('app started at: ' + port);