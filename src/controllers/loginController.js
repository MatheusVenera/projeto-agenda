const Login = require("../models/LoginModel");

exports.index = (req, resp, next) => {
    if (req.session.user) return resp.render('logado');
    return resp.render("login");
};

exports.register = async function (req, resp, next) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function() {
                return resp.redirect("/login");
            });
            return;
        };
        req.session.user = login.user;
        req.flash("success", 'Seu usuário foi criado com sucesso');
        req.session.save(function() {
            return resp.redirect("/");
        });
    } catch (error) {
        console.log('ERRO ABAIXO')
        console.error(error);
}
};


exports.login = async function (req, resp, next) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function() {
                return resp.redirect("/login");
            });
            return;
        };
        req.session.user = login.user;
        req.flash("success", 'Login realizado com sucesso');
        req.session.save(function() {
            return resp.redirect("/");
        });
    } catch (error) {
        console.log('ERRO ABAIXO')
        console.error(error);
}
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect("/login");
}