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

    app.get('/signin', authController.signin);
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));
    app.get('/signup', authController.signup);

    app.get('/logout', authController.logout);
    
    app.get('/post', isLoggedIn, authController.post);
    app.post('/upload', multer({ dest: path.resolve(__dirname, '../static/img/') }).single('upl'), function(req, res, next){
        console.log('req.body', req.body);
        Post.create({
            weed_type: req.body.weed_type,
            strain: req.body.strain,
            description: req.body.description,
            date_created: new Date(),
            upl: req.file.filename,
            userId: req.user.id,
        }).then(function(post) {
    	    console.log('post: ', post);
            res.redirect('/posts')
        }).catch(next);
    });
    app.get('/posts', isLoggedIn, function(req, res, next) {
        Post.findAll({
            where: {
                userId: req.user.id,
            }
        }).then(function(postList) {
           const model = {
             postList,
           };
           res.render('posts', model);
        });
    });
    
    app.get('/dashboard', isLoggedIn, authController.dashboard);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}
