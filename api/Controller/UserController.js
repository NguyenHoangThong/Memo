

exports.getSignin = function (req, res) {
    res.render('signin', {title: 'Sign in'})
};

exports.getSignup = function (req, res) {
    res.render('signup', {title: 'Sign up'})
};

exports.postSignup = async function (req, res) {
    let _user;
    try{
        _user = await User.findOne({username: req.body.username});
        if( !_user ) {
            let user = new User({
                username: req.body.username,
                password: req.body.password
            });
            let check = await user.save();
            req.session.user = user.username;
            res.redirect('/');
        } else {
            res.render('signup', {title: 'Signup'});
        }
    }
    catch (e) {
        console.log('vvvvvvvv',e);
    }

};

exports.postSignin = async function (req, res) {
    let user;
    try{
        user = await User.findOne({username: req.body.username});
        if( !!user && !!user.username && user.validPassword(req.body.password) ) {
            req.session.user = user.username;
            res.redirect('/');
        } else {
            res.render('signin');
        }
    }
    catch (e) {
        console.log('aaaaaa',e);
    }

};