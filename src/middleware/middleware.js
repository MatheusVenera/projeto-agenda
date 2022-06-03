exports.middlewareGlobal = (req, resp, next) => {
    resp.locals.errors = req.flash('errors');
    resp.locals.success = req.flash('success');
    resp.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, resp, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login primeiro');
        req.session.save(() => resp.redirect('/login'));
        return;
    };
    next();
};

exports.checkCsrfError = (err, req, resp, next) => {
    if (err) {
        return resp.render('error');
    }

    next();
};

exports.csrfTokenMiddleware = (req, resp, next) => {
    resp.locals.csrfToken = req.csrfToken();
    next();
};