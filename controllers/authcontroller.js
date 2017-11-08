var exports = module.exports = {};

exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.dashboard = function(req, res) {
    res.render('dashboard', { username: req.user.firstname });
};

exports.post = function(req, res) {
    res.render('post');
};

exports.myPosts = function(req, res) {
    res.render('myPosts');
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
