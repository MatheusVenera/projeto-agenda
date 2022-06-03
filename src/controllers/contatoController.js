const res = require("express/lib/response");
const Contato = require("../models/ContatoModel");

exports.index = (req, resp, next) => {
    resp.render('contato', {contato: {}});
    return;
};

exports.register = async (req, resp, next) => {
    try {
        const contato = new Contato(req.body)
        await contato.register();
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => resp.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => resp.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (error) {
        console.error(error);
        return resp.render('error');
    }
};

exports.editIndex = async (req, resp, next) => {
    if(!req.params.id) return resp.render('error');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return resp.render('error');
    resp.render('contato', {contato})
};