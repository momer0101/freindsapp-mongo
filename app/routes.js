var User = require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function (app, passport, eventEmitter) {

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        User.find({_id: {$ne: req.user._id}}).then(function (users) {
            res.render('profile.ejs', {
                user: req.user,
                users: users
            });
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /*
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

*/
    app.get('/friends', isLoggedIn, function (req, res) {
        User.find({_id: {$in: req.user.friends}}).then(function (users) {
            res.render('friends.ejs', {
                user: req.user,
                users: users
            });
        });
    });


    app.post('/friends', isLoggedIn, function (req, res) {
        User.updateOne({_id: req.user._id}, {$addToSet: {friends: req.body.friendId}}, {multi: false}).then(function () {
            res.redirect('/friends');
        });
    });

    app.get('/user/:id', function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (err || !user) {
                res.json({message: 'user not found'})
            } else {
                var token = jwt.sign(user, 'shhhhh');
                res.send({message: 'success', token: token});
            }
        });
    });

    app.get('*', function (req, res) {
        res.render('404.ejs');
    });


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}