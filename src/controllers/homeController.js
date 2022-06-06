const Contato = require('../models/ContatoModel')
exports.index = async function(req, resp, next) {
    const contatos = await Contato.buscaContatos();
    resp.render('index', { contatos });
    return;
};