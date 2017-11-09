var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var env = require('dotenv').load();

var exphbs = require('express-handlebars');

//For Handlebars
app.set('views', './views');
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use('/static', express.static('static'));
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// -----------------------------------------------
//Models
var models = require("./models");

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next()
});
//Routes
var authRoute = require('./routes/routes.js')(app, passport);

app.listen(port, function (err) {

    if (!err)
        console.log("Site is live on PORT:", port);
    else console.log(err)

});
