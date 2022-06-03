exports.middlewareGlobal = (req, resp, next) => {
    resp.locals.errors = req.flash('errors');
    resp.locals.success = req.flash('success');
    resp.locals.user = req.session.user;
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