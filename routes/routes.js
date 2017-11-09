var authController = require('../controllers/authcontroller.js');

var path = require('path');
var multer  = require('multer');
var models = require("../models");
console.log('models:', models);
const Post = models.post;
// var upload = multer({ dest: path.resolve(__dirname, '../static/img/') })


module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('splash')
    });

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));

    app.post('/upload', multer({ dest: path.resolve(__dirname, '../static/img/') }).single('upl'), function(req, res, next){
        console.log('req.body', req.body);
        Post.create({
            weed_type: req.body.weed_type,
            strain: req.body.strain,
            description: req.body.description,
            date_created: new Date(),
            upl: req.file.filename,
        }).then(function(post) {
    	    console.log('post: ', post);
            res.redirect('/posts')
        }).catch(next);
    });

    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));

    app.get('/post', isLoggedIn, authController.post);

    app.get('/posts', isLoggedIn, authController.myPosts);


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}
