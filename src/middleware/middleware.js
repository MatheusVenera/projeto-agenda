exports.middlewareGlobal = (req, resp, next) => {
    resp.locals.variavelLocal = 'Este é o valor da variável local';
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