var authController = require('../controllers/authcontroller.js');

var path = require('path');
var multer  = require('multer');
// var upload = multer({ dest: path.resolve(__dirname, '../static/img/') })


module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));

    // POST route for saving a new post
    app.post("/upload", function(req, res) {
      db.Post.create(req.body).then(function(dbPost) {
        res.json(dbPost);
      });
    });


    app.post('/upload', multer({ dest: path.resolve(__dirname, '../static/img/') }).single('upl'), function(req,res){
        console.log(req.body);



	/* example output:
	{ title: 'abc' }
	 */
	    console.log(req.file); //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	    res.status(204).end();
        res.redirect('myPosts')
    });

    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }
    ));

    app.get('/post', isLoggedIn, authController.post);

    app.get('/myPosts', isLoggedIn, authController.myPosts);


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}
