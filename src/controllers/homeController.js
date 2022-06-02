//Get
exports.GETPaginaInicial = (req, resp, next) => {
    resp.render("index", {
        titulo: 'Este será o título da página',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });
    return;
};
//POST
exports.POSTPaginaInicial = (req, resp, next) => {
    resp.send(`Ei, sou sua nova rota de POST`);
};
